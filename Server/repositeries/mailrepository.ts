import { Mail, MailType, MailStatus, PostOffice } from "@prisma/client";
import { PrismaSingleton } from "./prismasingleton";
import { start } from "repl";

class MailRepository {
  private prisma = PrismaSingleton.getInstance();
  constructor() {
    this.prisma = PrismaSingleton.getInstance();
  }
  async calculatePrice(mailType: string, weight: number) {
    console.log("Mail type:", mailType);
    console.log("Weight:", weight);
    return "40";
  }

  async getMail(postalCode: string): Promise<Mail[]> {
    console.log("in mail repository");
    try {
      const res = await this.prisma.mail.findMany({
        where: {
          postalCode: postalCode,
        },
        orderBy: {
          mailID: "asc",
        },
        include: {
          transaction: {},
        },
      });

      console.log("Mails queried", res);

      return res;
    } catch (error) {
      console.error("Error getting mails:", error);
      throw error;
    }
  }

  async addMail(
    recepientAddressID: number,
    price: number,
    recepientName: string,
    weight: string,
    postalCode: string,
    mailCategoryName: MailType,
    transactionID: number,
    bundleID: number | null,
    mailstatus: MailStatus
  ): Promise<Mail> {
    try {
      console.log("adding mail");
      const res = await this.prisma.mail.create({
        data: {
          recepientAddressID: recepientAddressID,
          recepientName: recepientName,
          postalCode: postalCode,
          mailType: mailCategoryName,
          weight: weight,
          transactionID: transactionID,
          price: price,
          bundleID: bundleID,
          mailstatus: mailstatus,
        },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  // Fetch all mail items for the given employee
  async getMailItemsByEmployeeID(employeeID: string): Promise<any[]> {
    try {
      const mailItems = await this.prisma.$queryRaw<any[]>`
            SELECT 
                m."mailID",
                m."recepientName", 
                m."recepientAddressID",
                m."mailType",
                m."mailstatus",
                m."weight",
                m."price",
                a."addressNo",
                a."streetName",
                a."Locality",
                ar."areaName"
            FROM "Mail" AS m
            JOIN "Address" AS a ON m."recepientAddressID" = a."addressID"
            JOIN "Area" AS ar ON a."areaID" = ar."areaID"
            JOIN "Employee" AS e ON ar."employeeID" = e."employeeID"
            WHERE e."employeeID" = ${employeeID}
            ORDER BY m."mailID"
        `;
      console.log("Mail items fetched:", mailItems);
      return mailItems;
    } catch (error) {
      console.error("Error fetching mail items:", error);
      throw error;
    }
  }

  // Fetch all unique delivery addresses for the given employee
  async getDeliveryAddressesByEmployeeID(employeeID: string): Promise<any[]> {
    try {
      const uniqueAddresses = await this.prisma.$queryRaw<any[]>`
      SELECT DISTINCT 
          a."addressNo",
          a."streetName",
          a."Locality",
          a."latitude",
          a."longitude",
          ar."areaName"
      FROM "Mail" AS m
      JOIN "Address" AS a ON m."recepientAddressID" = a."addressID"
      JOIN "Area" AS ar ON a."areaID" = ar."areaID"
      JOIN "Employee" AS e ON ar."employeeID" = e."employeeID"
      WHERE e."employeeID" = ${employeeID}
      ORDER BY a."addressNo"
    `;

      console.log("Unique addresses fetched:", uniqueAddresses);
      return uniqueAddresses;
    } catch (error) {
      console.error("Error fetching unique addresses:", error);
      throw error;
    }
  }

  // Update the mail status
  updateMailStatus = async (mailID: number, newStatus: MailStatus) => {
    return await this.prisma.mail.update({
      where: { mailID },
      data: { mailstatus: newStatus },
    });
  };
  updateMailStatusWithSignature = async (
    mailID: number,
    newStatus: MailStatus,
    signature: string
  ) => {
    return await this.prisma.mail.update({
      where: { mailID },
      data: {
        mailstatus: newStatus,
        signature: signature,
      },
    });
  };

  getMailCountByType = async (startDate: Date, endDate: Date) => {
    console.log("in mail count");
    const res = await this.prisma.transaction.findMany({
      where: {
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: {
        date: true,
        mail: true,
      },
    });
    console.log(res);
    return res;
  };

  getReturnMail = async (postalCode: string) => {
    const res = await this.prisma.mail.findMany({
      where: {
        deliveryAttempts: {
          gte: 2,
        },
        address: {
          postalCode: postalCode, // compare postal code in address
        },
      },
      include: {
        address: true,
        transaction: true,
      },
    });

    console.log(res, "res res");
    return res;
  };

  async updateRecepientAddress(
    addressID: number,
    mailID: number,
    postalCode: string
  ) {
    try {
      const res = await this.prisma.mail.update({
        where: {
          mailID: mailID,
        },
        data: {
          recepientAddressID: addressID,
          postalCode: postalCode,
          deliveryAttempts: 0,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async trackMail(transactionID: number): Promise<any[]> {
    try {
      const res = await prisma.$queryRaw<any[]>`
            SELECT m."recepientName", m."mailstatus", p."postOfficeName"
            FROM "Mail" AS m
            JOIN "PostOffice" AS p 
            ON m."postalCode" = p."postalCode"
            WHERE m."mailID" = ${transactionID}
            LIMIT 100
        `;

      console.log("Mail details queried", res);
      return res;
    } catch (error) {
      console.error("Error fetching mail details:", error);
      throw error;
    }
  }

  async findBundleById(bundleID: number) {
    return await prisma.bundle.findUnique({
      where: { bundleID },
      include: {
        destPostOffice: true,
        currentPostOffice: true,
      },
    });
  }

  async findByPostalCode(postalCode: string): Promise<PostOffice | null> {
    try {
      const postOffice = await prisma.postOffice.findUnique({
        where: { postalCode },
      });

      return postOffice;
    } catch (error) {
      console.error("Error fetching post office:", error);
      throw error;
    }
  }
}

export { MailRepository };
