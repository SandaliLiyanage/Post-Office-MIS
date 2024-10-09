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

const authService = new AuthService();
const router = Router();

// router.use(authService.authorize);

router.post("/employeeRecords", EmployeeDetails);
router.post("/registration", Registration);
router.get("/user", getEmployeeDetails);
router.post("/update", UpdateEmployee);
router.post("/delete", DeleteEmployee);
router.post("/feedback", SubmitFeedback);
export default router;
