import { EmployeeRepository } from "../repositeries/employeerepository"
import LeaveRepository from "../repositeries/leaverepository";

class EmployeeManagementService{
    private employeeRepository: EmployeeRepository;
    private leaveRepository : LeaveRepository;
    constructor(employeeRepository: EmployeeRepository, leaveRepository: LeaveRepository){
        this.employeeRepository = employeeRepository;
        this.leaveRepository = leaveRepository;
    }


    async validateEmployeeID(employeeID: string){
        try{
            const employee = await this.employeeRepository.findUserbyID(employeeID);
            if (employee!=null) {
                return true;
            }else{
                console.log("false")
                return false;
            }
        }catch(error){
            return false
        }
        
    }
    async getLeaves(postalCode: string){
        try{
            const leaves = await this.leaveRepository.getLeaves(postalCode);
            return leaves;
        }catch(error){
            return null;
        }
    }

    async updateStatus(employeeID: string, status: string){
        try{
            const response = await this.leaveRepository.updateStatus(employeeID, status);
            return response;
        }catch(error){
            return null;
        }
    }
    
}

export default EmployeeManagementService;