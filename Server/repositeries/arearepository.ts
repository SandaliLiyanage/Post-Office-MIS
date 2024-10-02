import {PrismaClient, BundleStatus} from "@prisma/client"
const prisma = new PrismaClient();
interface  AreaDet{
    areaName: string,
    employeeName: string,
    mailID: number,
    addressID: number
}


class AreaRepository{
    async getArea (postalCode: string ){
        try{
        console.log("in area repository")
        const response= await prisma.$queryRaw<AreaDet[]>`
        SELECT 
                a."areaName",
                m."mailID",
                e."employeeName",
                ad."addressID"  
            FROM "Area" AS a
            LEFT JOIN "Employee" AS e ON a."employeeID" = e."employeeID"
            JOIN "Address"  AS ad ON ad."areaID" = a."areaID" 
            JOIN "Mail" AS m ON m."recepientAddressID" = ad."addressID"
            JOIN "Bundle" AS b ON b."bundleID" = m."bundleID"
            WHERE a."postalCode" = ${postalCode} AND   b."bundleStatus" = 'DISTRIBUTED'::"BundleStatus";`

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
   
    const res : {[key: string]: {employeeName: string, mailID: number[]}}={};
    response.forEach(response=>{
        const area = response.areaName
        if(!res[area]){
            res[area] = {employeeName: response.employeeName, mailID: [response.mailID]}
        }
        else{
            res[area].mailID.push(response.mailID)
        }
    })

    const areaDetails = Object.entries(res).map(([area, det]) => ({
        area,
        ...det
    }));
        console.log("grouped data",areaDetails)
        return areaDetails
    }catch(error){
        console.log(error)
        return null
    }}
}


export default AreaRepository