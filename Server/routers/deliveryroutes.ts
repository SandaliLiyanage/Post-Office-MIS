import {Router} from 'express';
import { getAreaDet } from '../controllers/areacontroller';
import AuthService from "../services/authservice";
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

console.log("in area routes")
router.post("/areaDet", getAreaDet)
export default router;