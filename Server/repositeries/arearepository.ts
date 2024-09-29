import {PrismaClient, Area} from "@prisma/client"
const prisma = new PrismaClient();


class AreaRepository{
    async getArea (postalCode: string ){
        try{

        const response = await prisma.$queryRaw<any[]>`
        SELECT 
                a."areaID",
                e."employeeName",
                m."mailID"
            FROM "Area" AS a
            JOIN "Employee" AS e ON a."employeeID" = e."employeeID"
            JOIN "Address"  AS ad ON ad."areaID" = a."areaID" 
            JOIN "Mail" AS m ON m."recepientAddressID" = ad."addressID"
            WHERE a."postalCode" = ${postalCode};`

        // const response = prisma.area.findMany({
        //     where:{
        //         postalCode: postalCode
        //     },
        //     select:{
        //         postman: true,
        //         areaName: true,
        //     }
        // })
        return response
    }catch(error){
        throw error
        return null
    }}
}

export default AreaRepository