import { Router } from "express";
import AuthService from "../services/authservice";
import {
  EmployeeDetails,
  getEmployeeDetails,
  Registration,
  UpdateEmployee,
  DeleteEmployee,
  SubmitFeedback,
} from "../controllers/employeecontroller";
import { EmployeeRepository } from "../repositeries/employeerepository";
import BcryptService  from "../services/cryptservice";
import JwtService from "../services/jwtservice";
import SessionStore  from "../services/sessionstore";
import {getLeaves} from "../controllers/employeecontroller";
import {UpdateStatus} from "../controllers/employeecontroller";
import {getNotifications} from "../controllers/employeecontroller";
const employeRepository = new EmployeeRepository();
const cryptService = new BcryptService();
const session = new SessionStore();
const jwtToken = new JwtService();
const authService = new AuthService(employeRepository, cryptService, session, jwtToken);
const router = Router();

// router.use(authService.authorize);

router.post("/employeeRecords", EmployeeDetails);
router.post("/registration", Registration);
router.get("/user", getEmployeeDetails);
router.post("/update", UpdateEmployee);
router.post("/delete", DeleteEmployee);
router.post("/feedback", SubmitFeedback);
router.post("/getLeaves", getLeaves);
router.post("/updateStatus", UpdateStatus)
router.post("/getNotifications", getNotifications)
export default router;
