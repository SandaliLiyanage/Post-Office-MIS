import {Prisma, PrismaClient, Address} from "@prisma/client"
const prisma = new PrismaClient();

class AddressRepository{
    async queryAddresses(search: string): Promise<Address[]>{
        try{
            console.log("in query",search)
            const res = await prisma.$queryRaw<Address[]> `SELECT "addressID","postalCode","Locality","addressNo","streetName" FROM "Address"
                WHERE "addressNo" LIKE '%${search.valueOf}%' 
                UNION
                SELECT "addressID","postalCode","Locality","addressNo","streetName" FROM "Address"
                WHERE "streetName" LIKE '%${search.valueOf}%';`
                ;
            console.log("this is what was queried",res); 
            return res
        }catch (error){
            console.log("unable to query", error)
            throw error
    } 
    }
}
export {AddressRepository};