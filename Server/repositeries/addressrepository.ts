import {Prisma, PrismaClient, Address} from "@prisma/client"
const prisma = new PrismaClient();

class AddressRepository{
    async queryAddresses(search: string): Promise<Address[]>{
        try{
            const searchArray = search.split(",") 
            const Array = searchArray.map(item => `${'%'}${item}${'%'}`)
            console.log(Array)
            console.log("in query",searchArray)

            const res = await prisma.$queryRaw<Address[]> `SELECT "addressID","postalCode","Locality","addressNo","streetName" FROM "Address"
                WHERE "addressNo" LIKE  ANY (array[${Array}])
                UNION
                SELECT "addressID","postalCode","Locality","addressNo","streetName" FROM "Address"
                WHERE "streetName" LIKE ANY (array[${Array}]);`
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