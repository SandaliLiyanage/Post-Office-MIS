import {Prisma, PrismaClient, Address} from "@prisma/client"
const prisma = new PrismaClient();

class AddressRepository{
    async queryAddresses(search: string): Promise<Address[]>{
        try{
            const res = await prisma.$queryRaw<Address[]> `SELECT "addressID","postalCode","Locality","addressNo","streetName" FROM "Address"
                WHERE "addressNo" LIKE '%5%' 
                UNION
                SELECT "addressID","postalCode","Locality","addressNo","streetName" FROM "Address"
                WHERE "streetName" LIKE '%Mol%';`
                ;console.log(res); 
                return res
        }catch (error){
            console.log("unable to query", error)
            throw error
    } 
    }
}
export {AddressRepository};