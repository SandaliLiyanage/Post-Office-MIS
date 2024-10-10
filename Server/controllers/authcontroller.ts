import { Request, Response } from 'express';
import AuthService from '../services/authservice';
import {OTPService} from '../services/otpservice';
import EmployeeService from '../services/employeeservice';
import  BcryptService  from '../services/cryptservice';
import JwtService from '../services/jwtservice';
import SessionStore from '../services/sessionstore';
import { EmployeeRepository } from '../repositeries/employeerepository';
import OTPRepository  from '../repositeries/otprepository';
import { EmailService } from '../services/emailservice';

const emailRepository = new EmployeeRepository();
const otpRepository = new OTPRepository();
const employeRepository = new EmployeeRepository();
const cryptService = new BcryptService();
const session = new SessionStore();
const jwtToken = new JwtService();
const emailService = new EmailService(emailRepository);
const authService = new AuthService(employeRepository, cryptService, session, jwtToken);
const otpService = new OTPService(otpRepository,emailService );
const employeeService = new EmployeeService(emailRepository);

const Login = async (req: Request, res: Response) => {
    const { employeeID, password } = req.body;

    try {
        const result = await authService.login(employeeID, password);
        console.log("in controller", result);
        if (result.token) {
            return res.status(200).json(result);
        } else {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.error("Error in Login controller", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const ValidateID = async(req: Request, res: Response)=>{
    console.log("validating id")
    const {employeeID} = req.body;
    try{
        const employee = await employeeService.validateEmployeeID(employeeID)
        return res.status(200).json(employee);
    }catch(error){
        throw error
    }
}

const GenerateOTP = async(req: Request, res: Response)=>{
    console.log("in auth controller generating OTP")
    const {employeeID} = req.body;
    try{
        const employee = await employeeService.validateEmployeeID(employeeID)
        if(employee == true){
        const result = await otpService.generateOTP(employeeID)
        console.log("this is the otp", result)
        return res.status(200).json(result);
    }
        else{
            const result = "Employee ID does not exist"
            return res.status(200).json(result);
        }
    } catch(error){
        return res.status(500).json({ message: "Error generating OTP" });
        
    }
}
const ValidateOTP = async(req: Request, res: Response)=> {
    console.log(req.body)
    const {employeeID, time} = req.body;
    const {pin} = req.body.values
    console.log(employeeID, time, pin)
    try{
        const result = await otpService.validateOTP(employeeID, time, pin);
        console.log("validated")
        return res.status(200).json(result);
    }catch(error){
        throw error
    }
}

const SetPassword = async(req: Request, res: Response)=>{
    const {employeeID} = req.body;
    const {newPassword, passwordCopy} = req.body.values
    const response = await authService.setPassword(employeeID, newPassword, passwordCopy)
    console.log("response in auth controller", response)
    return res.status(200).json(response);
}

export { Login, GenerateOTP, ValidateOTP, SetPassword, ValidateID};
