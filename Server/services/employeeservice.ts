import { EmployeeRepository } from "../repositeries/employeerepository"

const employeeRepository = new EmployeeRepository();

class EmployeeService{
    async validateEmployeeID(employeeID: string){
        const employee = await employeeRepository.findUserbyID(employeeID);
        if (employee!=null) {
            return true;
        }else{
            console.log("false")
            return false;
        }
    }
}

export default EmployeeService;