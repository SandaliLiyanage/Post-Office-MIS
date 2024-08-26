import { Router } from "express";

import {
  EmployeeDetails,
  getEmployeeDetails,
  Registration,
} from "../controllers/employeecontroller";

const router = Router();
router.post("/employeeRecords", EmployeeDetails);
router.post("/registration",Registration)
router.get("/user", getEmployeeDetails);

export default router;
