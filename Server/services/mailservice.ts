import { MailRepository } from "../repositeries/mailrepository";
import BundleService from "../services/bundleservice";
import { MailType } from "@prisma/client";


const mailRepository = new MailRepository();
const bundleservice = new BundleService();

// enum MailType{
//   NORMAL_MAIL,
//   REGISTERED_MAIL,
//   BULK_MAIL,
//   COURIER
// }
class MailService {
    async totalPrice(){   
    }
    

    async insertMail(mailArray: [], transactionID: number, postalCode: string){
      const confirmedMail = []
      console.log("in mail insertion")
        for (let mail of mailArray) {
            const {addressID, mailType, price, recepientName, telephone, weight} = mail
            const bundleID = await bundleservice.bundleValidation(addressID, postalCode)
            console.log(postalCode, "bundle ID is this", bundleID);
            let enumMail: MailType | null = null
            if (mailType == "normal mail"){
              enumMail = MailType.NORMAL_MAIL
            } if (mailType == "registered mail"){
              enumMail = MailType.REGISTERED_MAIL 
            } if (mailType == "courier"){
              enumMail = MailType.COURIER 
            }
            console.log(enumMail, "enum Mail", bundleID,bundleID)
            if (typeof (bundleID) === "number" && enumMail != null ){
              console.log(enumMail)
              const mail = await mailRepository.addMail(addressID, price, recepientName, weight, postalCode, enumMail, transactionID, bundleID ); 
              confirmedMail.push(mail)
            }
          }
          return confirmedMail
  }


  calculatePrice(mailType: string, weight: number){
    if(mailType == "normal mail"){
      if (weight > 0 && weight <= 250) return '200.00';
      if (weight > 250 && weight <= 500) return '250.00';
      if (weight > 500 && weight <= 1000) return '350.00';
      if (weight > 1000 && weight <= 2000) return '400.00';
      if (weight > 2000 && weight <= 3000) return '450.00';
      if (weight > 3000 && weight <= 4000) return '500.00';
      if (weight > 4000 && weight <= 5000) return '550.00';
      if (weight > 5000 && weight <= 6000) return '600.00';
      if (weight > 6000 && weight <= 7000) return '650.00';
      if (weight > 7000 && weight <= 8000) return '700.00';
      if (weight > 8000 && weight <= 9000) return '750.00';
      if (weight > 9000 && weight <= 10000) return '800.00';
      if (weight > 10000 && weight <= 15000) return '850.00';
      if (weight > 15000 && weight <= 20000) return '1100.00';
      if (weight > 20000 && weight <= 25000) return '1600.00';
      if (weight > 25000 && weight <= 30000) return '2100.00';
      if (weight > 30000 && weight <= 35000) return '2600.00';
      if (weight > 35000 && weight <= 40000) return '3100.00';
      return 'Rate not available for the entered weight';
    }else{
      return '40.00'
    }
      
    }
  }   

export default MailService