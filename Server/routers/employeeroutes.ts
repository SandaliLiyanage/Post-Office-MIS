import { Router } from "express";
import { EmployeeDetails } from "../controllers/employeedetails";

const router = Router();
router.post("/employeedetails", EmployeeDetails);
export default router;
