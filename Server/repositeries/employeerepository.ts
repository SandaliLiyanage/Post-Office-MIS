import { Employee, Role, Feedback } from "@prisma/client";
import { PrismaSingleton } from "./prismasingleton";

interface User {
  postOfficeName: string;
  employeeName: string;
  postalCode: string;
  role: string;
  email: string;
  latitude: number;
  longitude: number;
}
class EmployeeRepository {
  private prisma = PrismaSingleton.getInstance();
  private static instance: EmployeeRepository;
  constructor() {
    this.prisma = PrismaSingleton.getInstance();
  }
  static getInstance(): EmployeeRepository {
    if (!EmployeeRepository.instance) {
      EmployeeRepository.instance = new EmployeeRepository();
    }
    return EmployeeRepository.instance;
  }
  async getUserData(userName: string): Promise<User> {
    try {
      console.log(userName, "hee");
      const res = await this.prisma.$queryRaw<
        User[]
      >`SELECT e."employeeName",  e."role", e."postalCode", p."postOfficeName", e."email", p."latitude", p."longitude", e."employeeID"
            FROM "Employee" AS e 
            JOIN 
            "PostOffice" AS p 
            ON
            e."postalCode" = p."postalCode"
            WHERE e."employeeID" = ${userName}`;
      console.log("res res res", res[0]);
      return res[0];
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
  async findUserbyID(username: string): Promise<Employee | null> {
    try {
      const res = await this.prisma.employee.findUnique({
        where: {
          employeeID: username,
        },
      });

      console.log("employee queried", res);
      return res;
    } catch (error) {
      console.error("Error getting password from DB:", error);
      throw error;
    }
  }
  async registerUser(
    employeeID: string,
    userName: string,
    postalCode: string,
    telephone: string,
    email: string,
    role: Role
  ): Promise<Employee | null> {
    try {
      const result = await this.prisma.employee.create({
        data: {
          employeeID: employeeID,
          postalCode: postalCode,
          employeeName: userName,
          email: email,
          telephone: telephone,
          role: role,
        },
      });
      return result;
    } catch (error) {
      console.error("Error registering user:", error);
      return null;
    }
  }

  async getEmployees(postalCode: string): Promise<Employee[]> {
    try {
      console.log(postalCode);
      const res = await this.prisma.employee.findMany({
        where: {
          postalCode: postalCode,
        },
      });
      return res;
    } catch (error) {
      console.error("Error getting employees:", error);
      throw error;
    }
  }

  async updateEmployee(
    employeeID: string,
    telephone: string,
    role: string,
    email: string
  ): Promise<string> {
    try {
      console.log("hehe role", role, telephone, email, employeeID);
      const employee: Employee = await this.prisma.employee.update({
        where: { employeeID: employeeID },
        data: { telephone: telephone },
      });
      console.log(employee);
      console.log("employee updated");
      return "Employee Updated";
    } catch (error) {
      throw error;
    }
  }

  async changePassword(employeeID: string, newPassword: string) {
    try {
      const response = await this.prisma.employee.update({
        where: { employeeID: employeeID },
        data: { password: newPassword },
      });
      console.log(response);
      return "password updated";
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployee(employeeID: string) {
    console.log(employeeID);
    console.log("in delete repository");
    // const response = await prisma.employee.delete({
    //     where: {
    //         employeeID: employeeID
    //     }
    // })
  }
  async saveFeedback(
    employeeID: string,
    feedbackText: string
  ): Promise<Feedback> {
    try {
      const feedback = await this.prisma.feedback.create({
        data: {
          employeeID: employeeID,
          feedbackText: feedbackText,
        },
      });
      console.log("Feedback saved:", feedback);
      return feedback;
    } catch (error) {
      console.error("Error saving feedback:", error);
      throw error;
    }
  }
}
export { EmployeeRepository };
