import OTPRepository from "../repositeries/otprepository"
import {EmailService} from "./emailservice"



class OTPService{
    private otpRepository: OTPRepository;
    private emailService: EmailService;
    constructor(otpRepository: OTPRepository, emailService: EmailService){
        this.otpRepository = otpRepository;
        this.emailService = emailService;
    }
    async generateOTP(employeeID:string){
        let otp = "";
        let i: number;
        console.log("in generate otp in service");
        for(i=0; i<6; i++){
            otp += Math.floor(Math.random()*10)
        }
        console.log(otp)
        await this.otpRepository.insertOTP(employeeID, otp)
        this.sendOTP(otp, employeeID)
        return otp;
      }

    async sendOTP(otp: string, employeeID: string){
        console.log("in sending otp")
        await this.emailService.sendEmail(otp, employeeID)
    }

    async validateOTP(employeeID:string, time:Date, otp: string){
        console.log("in validate OTP")
        const validOTP =await this.otpRepository.getOTP(employeeID, time);
        console.log("thisis the otp queried")
        if(validOTP == otp){
            console.log("valid")
            return "valid"
        }else{
            console.log("not valid")
            return "not valid"
        }
    }
}

export {OTPService}