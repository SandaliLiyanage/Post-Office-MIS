import { PrismaSingleton } from "./prismasingleton";
import { Leave, RequestStatus, LeaveType } from "@prisma/client";

class LeaveRepository {
  private prisma = PrismaSingleton.getInstance();
  constructor() {
    this.prisma = PrismaSingleton.getInstance();
  }
  async getLeaves(postalCode: string): Promise<Leave[] | null> {
    try {
      console.log("in repo leaves");
      const leaves = await this.prisma.leave.findMany({
        where: {
          employee: {
            postalCode: postalCode,
          },
        },
        include: {
          employee: true,
        },
      });
      console.log(leaves);
      console.log(postalCode);
      return leaves || null;
    } catch (error) {
      throw error;
    }
  }
  async getNotifications(employeeID: string): Promise<Leave[] | null> {
    try {
      console.log("in repo notifications");
      const notifications = await this.prisma.leave.findMany({
        where: {
          employeeID: employeeID,
          startDate: {
            lt: new Date(),
          },
        },
        include: {
          employee: true,
        },
      });
      console.log(notifications);
      return notifications || null;
    } catch (error) {
      throw error;
    }
  }
  async updateStatus(
    employeeID: string,
    status: string
  ): Promise<Leave | null> {
    try {
      console.log("in update status", employeeID, status);
      const leave = await this.prisma.leave.update({
        where: {
          employeeID: employeeID,
        },
        data: {
          RequestStatus: status as RequestStatus,
        },
      });
      return leave || null;
    } catch (error) {
      throw error;
    }
  }

  async saveLeaveRequest(leaveData: {
    employeeid: string;
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    description?: string;
  }): Promise<Leave> {
    try {
      const leave = await this.prisma.leave.create({
        data: {
          employeeID: leaveData.employeeid,
          leaveType: leaveData.leaveType as LeaveType,
          startDate: new Date(leaveData.startDate),
          endDate: new Date(leaveData.endDate),
          description: leaveData.description || "",
          RequestStatus: "PENDING" as RequestStatus, // Setting default status to PENDING
          requstedDate: new Date(),
        },
      });
      return leave;
    } catch (error) {
      throw error;
    }
  }
}
export default LeaveRepository;
