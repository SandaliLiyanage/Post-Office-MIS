import OTPRepository from "../repositeries/otprepository"
import {EmailService} from "./emailservice"

const otprepository = new OTPRepository();
const emailservice = new EmailService();

class OTPService{
    async generateOTP(employeeID:string){
        let otp = "";
        let i: number;
        console.log("in generate otp in service");
        for(i=0; i<6; i++){
            otp += Math.floor(Math.random()*10)
        }
        console.log(otp)
        await otprepository.insertOTP(employeeID, otp)
        this.sendOTP(otp, employeeID)
        return otp;
      }

    async sendOTP(otp: string, employeeID: string){
        await emailservice.sendEmail(otp, employeeID)
    }

    async validateOTP(employeeID:string, time:Date, otp: string){
        const validOTP =await otprepository.getOTP(employeeID, time);
        if(validOTP == otp){
            return "otp validated"
        }else{
            return "not valid otp"
        }
    }
}

export {OTPService}