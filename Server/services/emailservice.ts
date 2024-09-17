import { EmployeeRepository } from "../repositeries/employeerepository"

const employeeRepository = new EmployeeRepository();
class EmailService{
    async sendEmail(otp: string, employeeID:string){
        const emailAddress = await this.getEmail(employeeID);
        console.log(` sending email to the ${emailAddress}`)
        return "sending mail"

    }
    async getEmail(employeeID: string){
        const result = await employeeRepository.findUserbyID(employeeID);
        const email = result?.email
        return email
    }
}

export {EmailService}