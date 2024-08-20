import {Request, Response, NextFunction} from 'express';
import { EmployeeRepository } from "../repositeries/employeerepository";
import BcryptService from "./cryptservice";
import JwtService from "./jwtservice";
import SessionStore from "./sessionstore"

const employeeRepository = EmployeeRepository.getInstance();
const cryptService = new BcryptService();
const session = SessionStore.getInstance();
const jwtToken = new JwtService()
class AuthService{
    async login(username: string, password: string):Promise<{name?: string; post_office_area?:string; role?: string; message: string; token? : string;}>{
        try{      
            const user = await employeeRepository.findUserbyDB(username);
            console.log(user?.password)
            if(!user?.password){
                return {message: "Incorrect username"}
            }
            const hashedPassword = await cryptService.hashPassword(user.password)
            const isVerified = await cryptService.comparePassword(password, hashedPassword)
            if (isVerified){
                console.log("verified")
                const sessionId = new Date().toISOString();
                await session.storeSession(username)
                const token = jwtToken.sign({sessionId})
                return {message: "login success", token}
            }else{
                console.log("notverified")
                return {message: "login denied"}
            }
    }catch(error){
        console.error("login error")
        return {message: "login failed"}
    }  
}
     async authorize(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });
    
        try {
            const decoded = jwtToken.verify(token) as { sessionId: string };
            console.log("authorized")
            next();
        } catch (err) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
    }
  };

}
export default AuthService;