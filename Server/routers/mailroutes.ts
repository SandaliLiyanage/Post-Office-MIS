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
import {ReportData} from "../controllers/reportcontroller"
const authService = new AuthService();

const router = Router();

// router.use(authService.authorize);

router.post("/calculatePrice", CalculatePrice);

router.post("/viewmails", Mails);
router.get("/employee", getMailItems);
router.get("/employee2", getMailItems2);
router.get("/in-transit", getMailItems3);
router.patch("/update-status", updateMailStatus);
router.post("/reportData", ReportData);
router.post("/addresssearch", Address);
router.post("/mailDetails", MailDetails);
export default router;
