import { PrismaClient, Mail, MailType, MailStatus } from "@prisma/client";
const prisma = new PrismaClient();
import { Decimal } from "@prisma/client/runtime/library";
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
    price:  null | Decimal,
    recepientName: string,
    weight: null | Decimal,
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
        signature: signature, // Assuming the `mail` table has a `signature` column
      },
    });
  };
}

export { MailRepository };
