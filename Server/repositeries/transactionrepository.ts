import {PrismaClient, Transaction} from "@prisma/client"
const prisma = new PrismaClient();


class TransactionRepository{
    async createTransactoin(customerTelephone:string, customerName: string, amount: number, customerAddressID: number):Promise<Transaction>{
        const dateTimeObject = new Date()
        console.log(dateTimeObject)
        const res = await prisma.transaction.create({
            data:{
                customerTelephone: customerTelephone,
                customerName: customerName,
                amount: amount,
                customerAddressID: customerAddressID,
                date: new Date()

            }
        })
        console.log(res)
        return res
    }
}

export {TransactionRepository}