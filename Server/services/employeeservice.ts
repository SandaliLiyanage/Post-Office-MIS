import { EmployeeRepository } from "../repositeries/employeerepository"


class EmployeeService{
    private employeeRepository: EmployeeRepository;
    constructor(employeeRepository: EmployeeRepository){
        this.employeeRepository = employeeRepository;
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
}

export default EmployeeService;