import {Router} from 'express';
import {CustomerDetails} from '../controllers/customerdetails';
import {CalculatePrice} from '../controllers/mailcontroller';
import AuthService from '../services/authservice';

const authService = new AuthService();

const router = Router();
console.log("in mail routes");
router.use(authService.authorize);
router.post('/customerDetails', CustomerDetails);
router.post('/calculatePrice', CalculatePrice);
export default router;