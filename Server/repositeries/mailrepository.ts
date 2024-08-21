import {PrismaClient, Mail} from "@prisma/client"
const prisma = new PrismaClient();

class MailRepository{
    async calculatePrice(mailType: string, weight: number){
        console.log("Mail type:", mailType);
        console.log("Weight:", weight);
        return "Price calculated";  
    }
}
export {MailRepository}