import { Router } from "express";
// import {CustomerDetails} from '../controllers/customerdetails';
import {
  CalculatePrice,
  getMailItems2,
  getMailItems3,
  updateMailStatus,
} from "../controllers/mailcontroller";
import AuthService from "../services/authservice";
import { MailBundles } from "../controllers/mailcontroller";
import { Mails } from "../controllers/mailcontroller";
import { getMailItems } from "../controllers/mailcontroller";
import Address from "../controllers/addresscontroller";
import { MailDetails } from "../controllers/mailcontroller";
const authService = new AuthService();

const router = Router();
console.log("in mail routes");
// router.use(authService.authorize);
// router.post('/customerDetails', CustomerDetails);

router.post("/calculatePrice", CalculatePrice);
router.post("/bundles", MailBundles);
router.post("/viewmails", Mails);
router.get("/employee", getMailItems);
router.get("/employee2", getMailItems2);
router.get("/in-transit", getMailItems3);
router.patch("/update-status", updateMailStatus);
// router.post('/addresssearch', Address)
router.post("/addresssearch", Address);
router.post("/mailDetails", MailDetails);
export default router;
