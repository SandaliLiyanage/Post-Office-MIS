import { Router } from "express";

// Import controller functions
import {
  //EmployeeDetails,
  getEmployeeDetails,
  //Registration,
} from "../controllers/employeecontroller";

const router = Router(); // Create a new router instance

//router.post("/employeeRecords", EmployeeDetails);
//router.post("/registration", Registration);
router.get("/user", getEmployeeDetails);

export default router;
