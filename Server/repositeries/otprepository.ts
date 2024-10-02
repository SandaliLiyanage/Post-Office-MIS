import {OTP, PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

class OTPRepository{
    async insertOTP(employeeID: string, otp: string){
        const currentTime = new Date()
        try{
            const res = await prisma.oTP.create({
                data:{
                    employeeID: employeeID,
                    OTP: otp,
                    createdAt:new Date(),
                    expiresAt: new Date( currentTime.getTime() + 5 * 60 * 1000),
                    unused: true
                }
            })
        }catch(error){
            throw error
        }
    }
    async getOTP(employeeID:string, time: Date){
    console.log("heeh in getOTP")
    console.log(employeeID, time)
    const res = await prisma.oTP.findFirst({
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
    return (res?.OTP)
    }

    
}

export default OTPRepository