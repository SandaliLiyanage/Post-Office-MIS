import { Router } from "express";

import {
  EmployeeDetails, getEmployeeDetails, Registration, updateEmployee} from "../controllers/employeecontroller";

const router = Router();
router.post("/employeeRecords", EmployeeDetails);
router.post("/registration",Registration)
router.get("/user", getEmployeeDetails);
router.post("/update", updateEmployee);
export default router;
