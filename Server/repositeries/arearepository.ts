import {PrismaClient, BundleStatus} from "@prisma/client"
const prisma = new PrismaClient();
interface  AreaDet{
    areaName: string,
    employeeName: string,
    mailID: number,
}

class AreaRepository{
    async getArea (postalCode: string ): Promise <AreaDet[]|null>{
        try{
        console.log("in area repository")
        const response= await prisma.$queryRaw<AreaDet[]>`
        SELECT 
                a."areaName",
                e."employeeName",
                ad."addressID"  
            FROM "Area" AS a
            LEFT JOIN "Employee" AS e ON a."employeeID" = e."employeeID"
            JOIN "Address"  AS ad ON ad."areaID" = a."areaID" 
            JOIN "Mail" AS m ON m."recepientAddressID" = ad."addressID"
            JOIN "Bundle" AS b ON b."bundleID" = m."bundleID"
            WHERE a."postalCode" = ${postalCode} AND   b."bundleStatus" = 'ARRIVED'::"BundleStatus";`

        // const response = prisma.area.findMany({
        //     where:{
        //         postalCode: postalCode
        //     },
        //     select:{
        //         postman: true,
        //         areaName: true,
        //     }
        // })

    //     SELECT 
    //     a."areaName",
    //     e."employeeName",
    //     m."mailID"
    // FROM "Area" AS a
    // LEFT JOIN "Employee" AS e ON a."employeeID" = e."employeeID"
    // JOIN "Address"  AS ad ON ad."areaID" = a."areaID" 
    // JOIN "Mail" AS m ON m."recepientAddressID" = ad."addressID"
    // WHERE a."postalCode" = ${postalCode};`
        return response
    }catch(error){
        console.log(error)
        return null
    }}
}


export default AreaRepository