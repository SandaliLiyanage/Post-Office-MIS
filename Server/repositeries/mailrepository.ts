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
       
        async addMail(recepientAddressID: number, price: number, recepientTelephone: string, recepientName: string,  weight: string, postalCode: string, mailCategoryName: string, transactionID: number, bundleID:number): Promise<Mail>{
            console.log("in mail repository")
            try{
                const res = await prisma.mail.create({
                    data:{
                        recepientAddressID: recepientAddressID,
                        recepientName: recepientName,
                        postalCode: postalCode,
                        mailCategoryName: mailCategoryName,
                        weight: weight,
                        transactionID: transactionID,
                        recepientTelephone: recepientTelephone,
                        price: price,
                        bundleID: bundleID
                    }
                })

                return res
            }catch(error){
                throw error
        }
        }
    }

    
export {MailRepository}