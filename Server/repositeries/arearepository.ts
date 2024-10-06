import {PrismaClient, BundleStatus} from "@prisma/client"
import { AddressRepository } from "./addressrepository";
const prisma = new PrismaClient();
interface  AreaDet{
    areaName: string,
    employeeName: string,
    mailID: number,
    addressID: number
}

const addressRepostiory = new AddressRepository()
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
            LEFT JOIN "Bundle" AS b ON b."bundleID" = m."bundleID"
            WHERE a."postalCode" = ${postalCode} AND m."mailstatus" = 'IN_TRANSIT'::"MailStatus" 
            ;`
    console.log(response)
    const res : {[key: string]: {employeeName: string,dict: { [mailID: number]: { address: string } }[] } }={};
    await Promise.all(response.map(async (resp) => {
        const area = resp.areaName;
        const address = await addressRepostiory.getAddress(resp.addressID);
        
        if (address) {
          if (!res[area]) {
            res[area] = {
              employeeName: resp.employeeName,
              dict: [{ [resp.mailID]: { address } }],

            };
      console.log(res[area].dict[0],"ok")

          } else {
            res[area].dict.push({ [resp.mailID]: { address } });
          }
        }
      }));
      console.log(res);
    console.log(res, "huity")
    console.log(res["Kaduwela-South"].dict[0], "hehe")

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