import {PrismaClient, Mail} from "@prisma/client"
const prisma = new PrismaClient();

class MailRepository{
    async calculatePrice(mailType: string, weight: number){
        console.log("Mail type:", mailType);
        console.log("Weight:", weight);
        return "40";  
    }
    async getMail(postalCode:string): Promise<Mail[]> {
            console.log("in mail repository");
            try {
                const res = await prisma.mail.findMany({
                    where:{
                        postalCode: postalCode,
                    },
                });
                console.log("Mails queried", res)
                return res;
            } catch (error) {
                console.error("Error getting mails:", error);
                throw error;
            }
        }
    }
export {MailRepository}