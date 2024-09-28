import {Router} from 'express';
import { Login } from '../controllers/authcontroller';
import {GenerateOTP} from '../controllers/authcontroller'
import { ValidateOTP } from '../controllers/authcontroller';
import {SetPassword} from '../controllers/authcontroller'
import {ValidateID} from '../controllers/authcontroller'
const router = Router();
console.log("in auth routes")
router.post('/login', Login);
router.post('/generateOTP', GenerateOTP)
router.post('/validateOTP', ValidateOTP)
router.post('/setpassword', SetPassword)
router.post('/validateID', ValidateID)
export default router;