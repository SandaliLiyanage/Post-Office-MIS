import {Router} from 'express';
import { Login } from '../controllers/authcontroller';
import {GenerateOTP} from '../controllers/authcontroller'
import { ValidateOTP } from '../controllers/authcontroller';
const router = Router();
console.log("in auth routes")
router.post('/login', Login);
router.post('/generateOTP', GenerateOTP)
router.post('/validateOTP', ValidateOTP)
export default router;