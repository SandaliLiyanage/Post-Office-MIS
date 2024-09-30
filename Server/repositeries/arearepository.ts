import {PrismaClient, Area} from "@prisma/client"
const prisma = new PrismaClient();
interface  AreaDet{
    areaName: string,
    employeeName: string,
    mailID: number,
}

class AreaRepository{
    async getArea (postalCode: string ): Promise <AreaDet[]|null>{
        try{

        const response= await prisma.$queryRaw<AreaDet[]>`
        SELECT 
                a."areaName",
                e."employeeName",
                m."mailID"
            FROM "Area" AS a
            JOIN "Employee" AS e ON a."employeeID" = e."
            "
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
        return null
    }}
}

export default AreaRepository