import { EmployeeRepository } from "../repositeries/employeerepository"

const employeeRepository = new EmployeeRepository();

class EmployeeService{
    async validateEmployeeID(employeeEmail: string){
        try{
            const employee = await employeeRepository.findUserbyID(employeeEmail);
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
}

export default EmployeeService;