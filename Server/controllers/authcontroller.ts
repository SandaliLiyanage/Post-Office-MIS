import { Request, Response } from 'express';
import AuthService from '../services/authservice';
import {OTPService} from '../services/otpservice';


const authService = new AuthService();
const otpService = new OTPService();

const Login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const result = await authService.login(username, password);
        console.log("in controller", result);
        if (result.token) {
            return res.status(200).json(result);
        } else {
            return res.status(401).json(result);
        }
    } catch (error) {
        console.error("Error in Login controller", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const GenerateOTP = async(req: Request, res: Response)=>{
    console.log("in auth controller generating OTP")
    const {employeeID} = req.body;
    try{
        const result = await otpService.generateOTP(employeeID)
        console.log("this is the otp", result)
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json({ message: "Error generating OTP" });
        
    }
}

const ValidateOTP = async(req: Request, res: Response)=> {
    const {employeeID, time, inputOTP} = req.body;
    try{
        const result = otpService.validateOTP(employeeID, time, inputOTP);
        return result
    }catch(error){
        throw error
    }
}

export { Login, GenerateOTP, ValidateOTP };
