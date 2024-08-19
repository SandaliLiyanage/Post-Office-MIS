import {Router} from 'express';
import {customerDetails} from '../controllers/customerdetails';
import AuthService from '../services/authservice';

const authService = new AuthService();

const router = Router();
router.use(authService.authorize);
router.post('/customerDetails', customerDetails);
export default router;