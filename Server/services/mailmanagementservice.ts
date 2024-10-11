import { MailRepository } from "../repositeries/mailrepository";
import BundleService from "./mailtransferservice";
import { MailStatus, MailType } from "@prisma/client";


class MailService {
    private mailRepository: MailRepository;
    private bundleservice: BundleService;
    constructor(mailRepository: MailRepository, bundleservice: BundleService){
        this.bundleservice = bundleservice;
        this.mailRepository = mailRepository;
    }

    async insertMail(mailArray: [], transactionID: number, postalCode: string){
      const confirmedMail = []
      console.log("in mail insertion", postalCode)
        for (let mail of mailArray) {
            const {addressID, mailType, price, recepientName, telephone, weight} = mail
            const bundleID = await this.bundleservice.bundleValidation(addressID, postalCode)
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
            if ((typeof (bundleID) === "number") &&  enumMail != null  ){
              console.log(enumMail)
              const mail = await this.mailRepository.addMail(addressID, price, recepientName, weight, postalCode, enumMail, transactionID, bundleID, MailStatus.IN_TRANSIT ); 
              confirmedMail.push(mail)
            }
            if ((bundleID == null )&&  enumMail != null  ){
              console.log(enumMail)
              const mail = await this.mailRepository.addMail(addressID, price, recepientName, weight, postalCode, enumMail, transactionID, bundleID, MailStatus.IN_TRANSIT ); 
              confirmedMail.push(mail)
            }
          }
          return confirmedMail
  }
  calculateTotal(mailArray: []){
    let total = 0
    for (let mail of mailArray){
      const {addressID, mailType,  recepientName, telephone, weight} = mail
      let price = this.calculatePrice(mailType, weight)
      let amount = Number(price)
      total = total+amount 
      console.log(total)
    }
    return total
  }

  async changeAddress(addressID: number, mailID: number, postalCode: string){
    const res = await this.mailRepository.updateRecepientAddress(addressID, mailID, postalCode);
    return res
  }


  calculatePrice(mailType: string, weight: number){
    if (mailType == "normal mail") {
    if (weight > 0 && weight <= 20) return '50.00';
    if (weight > 20 && weight <= 30) return '60.00';
    if (weight > 30 && weight <= 40) return '70.00';
    if (weight > 40 && weight <= 50) return '80.00';
    if (weight > 50 && weight <= 60) return '90.00';
    if (weight > 60 && weight <= 70) return '100.00';
    if (weight > 70 && weight <= 80) return '110.00';
    if (weight > 80 && weight <= 90) return '120.00';
    if (weight > 90 && weight <= 100) return '130.00';
    if (weight > 100 && weight <= 150) return '150.00';
    if (weight > 150 && weight <= 200) return '170.00';
    if (weight > 200 && weight <= 250) return '190.00';
    if (weight > 250 && weight <= 300) return '210.00';
    if (weight > 300 && weight <= 350) return '230.00';
    if (weight > 350 && weight <= 400) return '250.00';
    if (weight > 400 && weight <= 450) return '270.00';
    if (weight > 450 && weight <= 500) return '290.00';
    if (weight > 500 && weight <= 550) return '310.00';
    if (weight > 550 && weight <= 600) return '330.00';
    if (weight > 600 && weight <= 650) return '350.00';
    if (weight > 650 && weight <= 700) return '370.00';
    if (weight > 700 && weight <= 750) return '390.00';
    if (weight > 750 && weight <= 800) return '410.00';
    if (weight > 800 && weight <= 850) return '430.00';
    if (weight > 850 && weight <= 900) return '450.00';
    if (weight > 900 && weight <= 950) return '470.00';
    if (weight > 950 && weight <= 1000) return '490.00';
    if (weight > 1000 && weight <= 1250) return '520.00';
    if (weight > 1250 && weight <= 1500) return '550.00';
    if (weight > 1500 && weight <= 1750) return '580.00';
    if (weight > 1750 && weight <= 2000) return '610.00';
}
  if (mailType == "courier") {
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
  }
  if (mailType == "registered mail") {
    if (weight > 0 && weight <= 20) return '65.00';
    if (weight > 20 && weight <= 30) return '75.00';
    if (weight > 30 && weight <= 40) return '80.00';
    if (weight > 40 && weight <= 50) return '80.00';
    if (weight > 50 && weight <= 60) return '90.00';
    if (weight > 60 && weight <= 70) return '100.00';
    if (weight > 70 && weight <= 80) return '110.00';
    if (weight > 80 && weight <= 90) return '120.00';
    if (weight > 90 && weight <= 100) return '130.00';
    if (weight > 100 && weight <= 150) return '150.00';
    if (weight > 150 && weight <= 200) return '170.00';
    if (weight > 200 && weight <= 250) return '190.00';
    if (weight > 250 && weight <= 300) return '210.00';
    if (weight > 300 && weight <= 350) return '230.00';
    if (weight > 350 && weight <= 400) return '250.00';
    if (weight > 400 && weight <= 450) return '270.00';
    if (weight > 450 && weight <= 500) return '290.00';
    if (weight > 500 && weight <= 550) return '310.00';
    if (weight > 550 && weight <= 600) return '330.00';
    if (weight > 600 && weight <= 650) return '350.00';
    if (weight > 650 && weight <= 700) return '370.00';
    if (weight > 700 && weight <= 750) return '390.00';
    if (weight > 750 && weight <= 800) return '410.00';
    if (weight > 800 && weight <= 850) return '430.00';
    if (weight > 850 && weight <= 900) return '450.00';
    if (weight > 900 && weight <= 950) return '470.00';
    if (weight > 950 && weight <= 1000) return '490.00';
    if (weight > 1000 && weight <= 1250) return '520.00';
    if (weight > 1250 && weight <= 1500) return '550.00';
    if (weight > 1500 && weight <= 1750) return '580.00';
    if (weight > 1750 && weight <= 2000) return '610.00';
  }
  
  else{
    return '40.00'
    }
      
    }
  }   

export default MailService