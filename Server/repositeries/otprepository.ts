import {OTP, PrismaClient} from "@prisma/client";
import { PrismaSingleton } from "./prismasingleton";
class OTPRepository{
    private prisma = PrismaSingleton.getInstance();
    constructor(){
        this.prisma = PrismaSingleton.getInstance();
    }
    async insertOTP(employeeID: string, otp: string){
        const currentTime = new Date()
        try{
            const res = await this.prisma.oTP.create({
                data:{
                    employeeID: employeeID,
                    OTP: otp,
                    createdAt:new Date(),
                    expiresAt: new Date( currentTime.getTime() + 5 * 60 * 1000),
                    unused: true
                }
            })
        }catch(error){
            console.log(error)
        }
    }
    async getOTP(employeeID:string, time: Date){
    console.log("heeh in getOTP")
    console.log(employeeID, time)
    try{
    const res = await this.prisma.oTP.findFirst({
        where: {
            employeeID: employeeID,
            createdAt: {
                lt: time
            },
            expiresAt:{
                gt:time
            },
            unused: true

        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    console.log(res)
    console.log(res?.OTP)
    return (res?.OTP)}catch(error){
        return "null"
    }
    }

    
}

export default OTPRepository