import { EmployeeRepository } from "../repositeries/employeerepository";
import BcryptService from "./cryptservice";
import JwtService from "./jwtservice";
import SessionStore from "./sessionstore"

const employeeRepository = EmployeeRepository.getInstance();
const cryptService = new BcryptService();
const session = SessionStore.getInstance();
const jwtToken = new JwtService()
class AuthService{
    async login(username: string, password: string):Promise<{message: string; token? : string}>{
        try{      
            const hashedPasswordfromDB = await employeeRepository.getPasswordfromDB(username);
            console.log(hashedPasswordfromDB)
            if(!hashedPasswordfromDB){
                return {message: "Incorrect username"}
            }
            const hashedPassword = await cryptService.hashPassword(hashedPasswordfromDB)
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
    
}}
export default AuthService;