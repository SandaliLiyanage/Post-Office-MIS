import {Router} from 'express';
import {CustomerDetails} from '../controllers/customerdetails';
import {CalculatePrice} from '../controllers/mailcontroller';
import AuthService from '../services/authservice';
import { MailBundles } from '../controllers/mailcontroller';
import {Mails} from '../controllers/mailcontroller';
const authService = new AuthService();

const router = Router();
console.log("in mail routes");
router.use(authService.authorize);
router.post('/customerDetails', CustomerDetails);
router.post('/calculatePrice', CalculatePrice);
router.post('/bundles', MailBundles);
router.post('/viewmails', Mails);
export default router;