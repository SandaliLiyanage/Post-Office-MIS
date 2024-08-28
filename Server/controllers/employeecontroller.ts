import { Request, Response } from "express";
import { getEmployeeDetailsById } from "../repositeries/employeerepository";

// const EmployeeDetails = async (req: Request, res: Response) => {
//   const employeeRepo = EmployeeRepository.getInstance();
//   const employees = await employeeRepo.getEmployees(req.body.postalCode);
//   const result = employees.map((employee) => {
//     return {
//       employeeID: employee.employeeID,
//       employeeName: employee.employeeName,
//       email: employee.email,
//       telephone: employee.telephone,
//       role: employee.role,
//     };
//   });
//   console.log("Employee details received:", result);
//   return res.status(200).json(result);
// };

// Function to get employee details
const getEmployeeDetails = async (req: Request, res: Response) => {
  try {
    const employeeID = parseInt(req.query.employeeID as string, 10); // Extract the employeeID and convert to a number of base 10

    // Check if the employeeID is provided
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" }); // 400 status code for Bad Request
    }

    // Fetch employee details from the repository
    const employeeDetails = await getEmployeeDetailsById(employeeID);

    // Check if the employee details are found
    if (!employeeDetails) {
      return res.status(404).json({ error: "Employee not found" }); // 404 status code for Not Found
    }

    console.log("User details fetched:", employeeDetails);
    return res.status(200).json(employeeDetails); // 200 status code for OK
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ error: "Internal Server Error" }); // 500 status code for Internal Server Error
  }
};

export { getEmployeeDetails };
// const Registration = async (req: Request, res: Response) => {
//   console.log("Employee registration received:", req.body);
//   const { employeeName, employeeID, role, telephone, email, postalCode } =
//     req.body;
//   const upperrole = role.toUpperCase();
//   const employeeRepo = EmployeeRepository.getInstance();
//   const employee = await employeeRepo.registerUser(
//     employeeID,
//     employeeName,
//     postalCode,
//     telephone,
//     email,
//     upperrole
//   );
//   console.log("Employee registered:", employee);
//   return res.status(200).json(employee);
// };
// export { EmployeeDetails, Registration, getEmployeeDetails };
