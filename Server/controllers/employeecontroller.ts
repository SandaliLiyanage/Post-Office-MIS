import { Request, Response } from "express";
import { EmployeeRepository } from "../repositeries/employeerepository";


export const EmployeeDetails = async (req: Request, res: Response) => {
  const employeeRepo = EmployeeRepository.getInstance();
  const employees = await employeeRepo.getEmployees(req.body.postalCode);
  //define an employees with required fields
  const result = employees.map((employee) => {
    return {
      employeeID: employee.employeeID,
      employeeName: employee.employeeName,
      email: employee.email,
      telephone: employee.telephone,
      role: employee.role,
    };
  });
  console.log("Employee details received:", result);
  return res.status(200).json(result); 
};
