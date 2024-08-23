import { Router } from "express";
import { EmployeeDetails } from "../controllers/employeecontroller";
import { Registration } from "../controllers/employeecontroller";
const router = Router();
router.post("/employeeRecords", EmployeeDetails);
router.post("/registration",Registration)
router
export default router;
