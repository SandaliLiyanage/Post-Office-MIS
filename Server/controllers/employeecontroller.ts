import { Request, Response } from "express";
import { EmployeeRepository } from "../repositeries/employeerepository";
import EmployeeManagementService from "../services/employeemanagementservice";
import LeaveRepository from "../repositeries/leaverepository";


const UpdateLeaveStatus = async (req: Request, res: Response) => {
  const empRepo = EmployeeRepository.getInstance();
  const leaveRepo = new LeaveRepository
  const empService = new EmployeeManagementService(empRepo, leaveRepo);
  const { status, employeeID } = req.body;
  console.log(employeeID);
  console.log("in update status");
  const response = await empService.updateStatus(employeeID, status);
  return res.json(response);
}

const getNotifications = async (req: Request, res: Response) => {
  const empRepo = EmployeeRepository.getInstance();
  const leaveRepo = new LeaveRepository
  const empService = new EmployeeManagementService(empRepo, leaveRepo);
  const result = await empService.getNotifications(req.body.employeeID);
  return res.status(200).json(result);
}
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
  const employeeRepo = EmployeeRepository.getInstance();
  const employeeID = req.query.employeeID as string; // Extract the employeeID

  try {
    // Check if the employeeID is provided
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" }); // 400 status code for Bad Request
    }

    // Fetch employee details from the repository
    const userData = await employeeRepo.getUserData(employeeID);

    // Check if the employee exists
    if (!userData) {
      return res.status(404).json({ error: "Employee not found" }); // 404 status code for Not Found
    }

    const formattedRole =
      userData.role.charAt(0).toUpperCase() +
      userData.role.slice(1).toLowerCase();

    const result = {
      employeeName: userData.employeeName,
      postOfficeName: userData.postOfficeName,
      role: formattedRole,
      latitude: userData.latitude,
      longitude: userData.longitude,
    };

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

const UpdateEmployee = async (req: Request, res: Response) => {
  console.log("in update Employee", req.body);
  const employeeRepo = EmployeeRepository.getInstance();
  const { values, employeeID } = req.body;
  const { role, address, telephone, email } = values;
  console.log(employeeID);
  console.log(role);
  const response = await employeeRepo.updateEmployee(
    employeeID,
    telephone,
    role.toUpperCase(),
    email
  );
  console.log("hi hi", response);
  return res.json(response);
};
const DeleteEmployee = async (req: Request, res: Response) => {
  const employeeRepo = EmployeeRepository.getInstance();
  const { employeeID } = req.body;
  console.log(employeeID);
  console.log("in delete employee");
  const response = await employeeRepo.deleteEmployee(employeeID);
};

const SubmitFeedback = async (req: Request, res: Response) => {
  const employeeRepo = EmployeeRepository.getInstance();
  const { employeeID, feedback } = req.body;

  if (!employeeID || !feedback) {
    return res
      .status(400)
      .json({ error: "Employee ID and feedback are required" });
  }

  try {
    await employeeRepo.saveFeedback(employeeID, feedback);
    return res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLeaves = async (req: Request, res: Response) => {
  const empRepo = EmployeeRepository.getInstance();
  const leaveRepo = new LeaveRepository
  const empService = new EmployeeManagementService(empRepo, leaveRepo);
  const result = await empService.getLeaves(req.body.postalCode);
  return res.status(200).json(result);
}

export {
  getLeaves,
  EmployeeDetails,
  Registration,
  getEmployeeDetails,
  UpdateEmployee,
  DeleteEmployee,
  SubmitFeedback,
  UpdateLeaveStatus as UpdateStatus,
  getNotifications
};
