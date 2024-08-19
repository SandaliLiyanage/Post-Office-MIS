import {Router} from 'express';
import {customerDetails} from '../controllers/customerdetails';

const router = Router();
router.post('/customerDetails', customerDetails);
export default router;