import { Request, Response, NextFunction } from "express";
import { EmployeeRepository } from "../repositeries/employeerepository";
import BcryptService from "./cryptservice";
import JwtService from "./jwtservice";
import SessionStore from "./sessionstore";
interface LoginResponse {
  name?: string;
  postalCode?: string;
  role?: string;
  message: string;
  login: boolean;
  postOfficeName?: string;
  email?: string;
  token?: string;
  employeeID?: string;
}
class AuthService {
  private employeeRepository: EmployeeRepository;
  private cryptService: BcryptService;
  private session: SessionStore;
  private jwtToken: JwtService;
  constructor(employeRepository: EmployeeRepository, crypeService: BcryptService, session: SessionStore, jwtToken: JwtService) {
    this.employeeRepository = employeRepository;
    this.cryptService = crypeService;
    this.session = session;
    this.jwtToken = jwtToken;
  }  
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const employee = await this.employeeRepository.findUserbyID(username);
      console.log(employee?.password);
      if (!employee?.password) {
        const loginResponse: LoginResponse = {
          message: "Incorrect employeeID",
          login: false,
        };
        return loginResponse;
      }
      const hashedPassword = await this.cryptService.hashPassword(password);
      const isVerified = await this.cryptService.comparePassword(
        password,
        employee.password
      );
      console.log("isverified:", isVerified);
      console.log("employee:", employee);
      if (isVerified && employee) {
        console.log("verified");
        const sessionId = new Date().toISOString();
        // await session.storeSession(username)
        const role = employee.role;
        const token = this.jwtToken.sign({ sessionId });
        console.log(token, "hehe");
        const user = await this.employeeRepository.getUserData(username);
        console.log(user.employeeName);
        console.log("User:", user);
        const loginResponse: LoginResponse = {
          name: user.employeeName,
          postalCode: user.postalCode,
          role: user.role,
          message: "login success",
          login: true,
          postOfficeName: user.postOfficeName,
          token: token,
          email: user.email,
          employeeID: username,
        };
        console.log("login resoponse", loginResponse);
        return loginResponse;
      } else {
        console.log("notverified");
        const loginResponse: LoginResponse = {
          message: "login denied",
          login: false,
        };
        return loginResponse;
      }
    } catch (error) {
      console.error("login error");
      const loginResponse: LoginResponse = {
        message: "login failed",
        login: false,
      };
      return loginResponse;
    }
  }

  async authorize(req: Request, res: Response, next: NextFunction) {
    console.log("token header", req.headers.authorization?.split(" ")[1]);
    const token = req.headers.authorization?.split(" ")[1];
    console.log("in authorize");
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
      const decoded = this.jwtToken.verify(token) as { sessionId: string };
      console.log("authorized");
      next();
    } catch (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
  }

  async setPassword(
    employeeID: string,
    newPassword: string,
    passwordCopy: string
  ) {
    console.log("in set password");
    if (passwordCopy == newPassword) {
      const hashedPassword = await this.cryptService.hashPassword(newPassword);
      const response = await this.employeeRepository.changePassword(
        employeeID,
        hashedPassword
      );
      console.log("response in auth service", response);
      return response;
    }
  }
}
export default AuthService;
