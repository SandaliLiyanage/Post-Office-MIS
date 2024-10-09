import {Router} from 'express';
import { getAreaDet } from '../controllers/areacontroller';
import AuthService from "../services/authservice";
const authService = new AuthService();

const router = Router();
router.use(authService.authorize);

console.log("in area routes")
router.post("/areaDet", getAreaDet)
export default router;