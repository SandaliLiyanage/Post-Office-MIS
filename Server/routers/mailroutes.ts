import { Router } from "express";
// import {CustomerDetails} from '../controllers/customerdetails';
import {
  CalculatePrice,
  getMailItems2,
  getMailItems3,
  updateMailStatus,
} from "../controllers/mailcontroller";
import AuthService from "../services/authservice";
import { Mails } from "../controllers/mailcontroller";
import { getMailItems } from "../controllers/mailcontroller";
import Address from "../controllers/addresscontroller";
import { MailDetails } from "../controllers/mailcontroller";
import { ReportData } from "../controllers/reportcontroller";
import { getAddresses } from "../controllers/mailcontroller";
import {ReturnMail} from "../controllers/mailcontroller";
import {ChangeAddress} from "../controllers/mailcontroller"
import { EmployeeRepository } from "../repositeries/employeerepository";
import BcryptService  from "../services/cryptservice";
import JwtService from "../services/jwtservice";
import SessionStore  from "../services/sessionstore";

const employeRepository = new EmployeeRepository();
const cryptService = new BcryptService();
const session = new SessionStore();
const jwtToken = new JwtService();
const authService = new AuthService(employeRepository, cryptService, session, jwtToken);

const router = Router();

// router.use(authService.authorize);
router.post("/calculatePrice", CalculatePrice);
router.post("/viewmails", Mails);
router.get("/employee", getMailItems);
router.get("/employee2", getMailItems2);
router.get("/in-transit", getMailItems3);
router.get("/addresses", getAddresses);
router.patch("/update-status", updateMailStatus);
router.post("/reportData", ReportData);
router.post("/addresssearch", Address);
router.post("/mailDetails", MailDetails);
router.post("/returnmail", ReturnMail);
router.post("/changeaddress", ChangeAddress)
export default router;
