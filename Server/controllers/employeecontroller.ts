import { Request, Response } from "express";
import { EmployeeRepository } from "../repositeries/employeerepository";


const EmployeeDetails = async (req: Request, res: Response) => {
  const employeeRepo = EmployeeRepository.getInstance();
  const employees = await employeeRepo.getEmployees(req.body.postalCode);
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

const Registration = async (req: Request, res: Response) => {
  console.log("Employee registration received:", req.body);
  const { employeeName, employeeID, role, telephone, email, postalCode } = req.body;
  const upperrole = role.toUpperCase();
  const employeeRepo = EmployeeRepository.getInstance();
  const employee = await employeeRepo.registerUser( employeeID, employeeName, postalCode, telephone, email, upperrole);
  console.log("Employee registered:", employee);
  return res.status(200).json(employee);
}
export {EmployeeDetails, Registration}