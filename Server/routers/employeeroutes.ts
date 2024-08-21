import { Router } from "express";
import { EmployeeDetails } from "../controllers/employeecontroller";

const router = Router();
router.post("/employeeRecords", EmployeeDetails);
export default router;
