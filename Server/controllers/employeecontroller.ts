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

// Function to get employee details
const getEmployeeDetails = async (req: Request, res: Response) => {
  try {
    const employeeID = req.query.employeeID as string; // Extract the employeeID from the query parameters

    // Check if the employeeID is provided
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" }); // 400 status code for Bad Request
    }

    // Hardcoded employee details
    const result = {
      employeeID: "12345",
      employeeName: "John Doe",
      email: "john.doe@example.com",
      telephone: "+91 9876543210",
      role: "Postman",
      profilePicture: "pic.png",
      branch: "Moratuwa Branch",
    };

    // Check if the requested employeeID matches the hardcoded one
    if (employeeID !== result.employeeID) {
      return res.status(404).json({ error: "Employee not found" }); // 404 status code for Not Found
    }

    console.log("User details fetched:", result);
    return res.status(200).json(result); // 200 status code for OK
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ error: "Internal Server Error" }); // 500 status code for Internal Server Error
  }
};

const Registration = async (req: Request, res: Response) => {
  console.log("Employee registration received:", req.body);
  const { employeeName, employeeID, role, telephone, email, postalCode } =
    req.body;
  const upperrole = role.toUpperCase();
  const employeeRepo = EmployeeRepository.getInstance();
  const employee = await employeeRepo.registerUser(
    employeeID,
    employeeName,
    postalCode,
    telephone,
    email,
    upperrole
  );
  console.log("Employee registered:", employee);
  return res.status(200).json(employee);
};
export { EmployeeDetails, Registration, getEmployeeDetails };
