import { MailRepository } from "../repositeries/mailrepository";
import BundleService from "../services/bundleservice";


const mailRepository = new MailRepository();
const bundleservice = new BundleService();


class MailService {
    async totalPrice(){   
    }
    
    
    async insertMail(mailArray: [], transactionID: number, postalCode: string){
        for (let mail of mailArray) {
            const {addressID, mailType, price, recepientName, telephone, weight} = mail
            const bundleID = await bundleservice.bundleValidation(addressID, postalCode)
            console.log(postalCode, "bundle ID is this", bundleID);
            if (typeof (bundleID) === "number" ){
              await mailRepository.addMail(addressID, price, telephone, recepientName, weight, postalCode, mailType, transactionID, bundleID ); 
            }
          }
  }
    
}
export default MailService