import { EmployeeRepository } from "../repositeries/employeerepository"
import nodemailer from 'nodemailer';
const employeeRepository = new EmployeeRepository();
class EmailService{
    async sendEmail(otp: string, employeeID:string){

        console.log(process.env.USER, process.env.APP_PASSWORD)

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: true, 
            auth: {
              user: process.env.USER,
              pass: process.env.APP_PASSWORD,
            },
          });
        const emailAddress = await this.getEmail(employeeID);
        console.log("in the get mail")
        if(emailAddress && process.env.USER){
            console.log("in email address verified")
            const mailOptions = {
                from: '"Maddison Foo Koch " <sanallliyanagecse@gmail.com>',
                to: "pldsandali@gmail.com",
                subject:"One Time Password for login",
                text: "your otp is 567890"
    
            }
            try{
                await transporter.sendMail(mailOptions)
            }catch(error){
                // throw error
                console.error(error)
                return "error"
            }
        }
        
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