import { Router } from "express";
import {
  EmployeeDetails,
  getEmployeeDetails,
} from "../controllers/employeecontroller";

const router = Router();
router.post("/employeeRecords", EmployeeDetails);

router.get("/user", getEmployeeDetails);

export default router;
