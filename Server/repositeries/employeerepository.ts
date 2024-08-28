import { PrismaClient } from "@prisma/client";

// Create a new Prisma Client instance
const prisma = new PrismaClient();

// Function to fetch employee details by ID
const getEmployeeDetailsById = async (employeeID: number) => {
  try {
    // Fetch the employee and the related post office data
    const employee = await prisma.employee.findUnique({
      where: {
        employeeID: employeeID.toString(), // Fetch a single employee record by ID
      },
      include: {
        postOffice: true, // Fetch related post office details
      },
    });

    if (!employee) {
      return null; // Employee not found
    }

    return {
      employeeName: employee.employeeName, // Return the employee name
      postOfficeName:
        employee.postOffice?.postOfficeName || "No Post Office Assigned", // Check if the post office is assigned
    };
  } catch (error) {
    console.error("Error fetching employee details:", error);
    throw error;
  }
};

export { getEmployeeDetailsById };

// import {PrismaClient, Employee, Role} from "@prisma/client"
// const prisma = new PrismaClient();

// class EmployeeRepository {
//     private static instance: EmployeeRepository;
//     static getInstance(): EmployeeRepository{
//         if(!EmployeeRepository.instance){
//             EmployeeRepository.instance = new EmployeeRepository();
//         }
//         return EmployeeRepository.instance;
//     }

//     async findUserbyDB(username: string): Promise<Employee|null>{
//         try {
//             const res = await prisma.employee.findUnique({
//                 where: {
//                     employeeID: username,
//                 },
//             });
//             console.log("employee queried", res)
//             return res;
//         } catch (error) {
//             console.error("Error getting password from DB:", error);
//             throw error;
//         }
//     }
//     async registerUser(employeeID:string, userName:string, postalCode:string, telephone:string, email:string, role:Role ): Promise<Employee | null> {
//         try {
//             const result = await prisma.employee.create({
//                 data: {
//                     employeeID: employeeID,
//                     postalCode: postalCode,
//                     employeeName: userName,
//                     email: email,
//                     telephone: telephone,
//                     role: role,
//                 },
//             });
//             return result;
//         } catch (error) {
//             console.error("Error registering user:", error);
//             throw error;
//         }
//     }
//     async getEmployees(postalCode: string): Promise<Employee[]> {
//         try {
//             const res = await prisma.employee.findMany({
//                 where:{
//                     postalCode: postalCode,
//                 },
//             });
//             return res;
//         } catch (error) {
//             console.error("Error getting employees:", error);
//             throw error;
//         }
//     }
// }
// export {EmployeeRepository}
