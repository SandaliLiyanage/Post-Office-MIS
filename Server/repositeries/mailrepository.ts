import { PrismaClient, Mail, MailType, MailStatus } from "@prisma/client";
import { start } from "repl";
import Address from "../controllers/addresscontroller";
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
        include: {
          transaction: true
        }
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
    bundleID: number|null,
    mailstatus: MailStatus
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
          mailstatus: mailstatus
        },
      });

      return res;
    } catch (error) {
      throw error
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

  getReturnMail = async(postalCode: string)=>{
    const res = await prisma.mail.findMany({
      where: {
        deliveryAttempts: {
          gte: 2, 
        },
        address: {
          postalCode: postalCode // compare postal code in address
        }
       
    },
    include: {
      address: true,
      transaction: true
    }
  }
  )
  console.log(res, "res res")
  return res
  }

  async updateRecepientAddress(addressID: number, mailID: number, postalCode: string){
    try{
      const res = await prisma.mail.update({
        where: {
          mailID: mailID
        },
        data:{
          recepientAddressID: addressID,
          postalCode: postalCode,
          deliveryAttempts: 0
        }
      });
      return res
    
    }catch(error){
      console.log(error)
    }
    
  
 
    
  }
}
  
export {MailRepository};
