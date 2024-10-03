import { Router } from "express";

import {
  EmployeeDetails,
  getEmployeeDetails,
  Registration,
  UpdateEmployee,
  DeleteEmployee,
} from "../controllers/employeecontroller";

const router = Router();
router.post("/employeeRecords", EmployeeDetails);
router.post("/registration", Registration);
router.get("/user", getEmployeeDetails);
router.post("/update", UpdateEmployee);
router.post("/delete", DeleteEmployee);
//router.post("/feedback", Feedback);
export default router;
