import { PrismaClient, Mail, MailType, MailStatus } from "@prisma/client";
import { start } from "repl";
const prisma = new PrismaClient();

class MailRepository {

  async calculatePrice(mailType: string, weight: number) {
    console.log("Mail type:", mailType);
    console.log("Weight:", weight);
    return "40";
  }

  async getMail(postalCode: string): Promise<Mail[]> {
    console.log("in mail repository");
    try {
      const res = await prisma.mail.findMany({
        where: {
          postalCode: postalCode,
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
    bundleID: number
  ): Promise<Mail> {
    try {
      console.log("adding mail");
      const res = await prisma.mail.create({
        data: {
          recepientAddressID: recepientAddressID,
          recepientName: recepientName,
          postalCode: postalCode,
          mailType: mailCategoryName,
          weight: weight,
          transactionID: transactionID,
          price: price,
          bundleID: bundleID,
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
      const mailItems = await prisma.$queryRaw<any[]>`
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
      const uniqueAddresses = await prisma.$queryRaw<any[]>`
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
    return await prisma.mail.update({
      where: { mailID },
      data: { mailstatus: newStatus },
    });
  };

  updateMailStatusWithSignature = async (
    mailID: number,
    newStatus: MailStatus,
    signature: string
  ) => {
    return await prisma.mail.update({
      where: { mailID },
      data: {
        mailstatus: newStatus,
        signature: signature, 
      },
    });
  };

  getMailCountByType = async(startDate: Date, endDate:Date)=>{
    console.log("in mail count")
    const res = await prisma.transaction.findMany({
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
    console.log(res)
    return res
  }

  async trackMail(transactionID: number): Promise<any[]> { // Change the parameter type to number
    try {
        const res = await prisma.$queryRaw<any[]>`
            SELECT m."recepientName", m."mailstatus", p."postOfficeName"
            FROM "Mail" AS m
            JOIN "PostOffice" AS p 
            ON m."postalCode" = p."postalCode"
            WHERE m."transactionID" = ${transactionID}
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
}
  
export {MailRepository};
