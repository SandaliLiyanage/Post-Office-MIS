import {PrismaClient, Transaction} from "@prisma/client"
import { PrismaSingleton } from "./prismasingleton";

class TransactionRepository{
    private prisma = PrismaSingleton.getInstance();
    constructor(){
        this.prisma = PrismaSingleton.getInstance();
    }
    async createTransaction(customerTelephone:string, customerName: string, amount: number, customerAddressID: number):Promise<Transaction>{
        const dateTimeObject = new Date()
        console.log(dateTimeObject)
        const res = await this.prisma.transaction.create({
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