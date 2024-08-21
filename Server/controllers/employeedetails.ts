import { Request, Response } from "express";

export const EmployeeDetails = async (req: Request, res: Response) => {
  console.log("Employee details received:", req.body);
  res.send("Registration successful");
};
