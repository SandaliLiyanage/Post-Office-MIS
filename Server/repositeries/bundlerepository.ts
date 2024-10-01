import {Prisma, PrismaClient, Bundle, BundleStatus} from "@prisma/client"
const prisma = new PrismaClient();
class BundleRepository{
    async getCreatedBundles(postalCode: string): Promise<Bundle[]| null> {
        console.log("get bundles", postalCode)
        if(postalCode){
        try {
            const res = await prisma.bundle.findMany({
                where:{
                    currentPostCode: postalCode,
                    bundleStatus: BundleStatus.CREATED
                },
            });
            console.log("Bundles queried", res)
            return res;
        } catch (error) {
            console.error("Error getting bundles:", error);
            throw error;
        }}
        return null
    }

    async getDeliveryBundles(postalCode: string): Promise<Bundle[]| null> {
        console.log("get bundles in delivery", postalCode)
        if(postalCode){
        try {
            const res = await prisma.bundle.findMany({
                where:{
                    destPostalCode: postalCode,
                    bundleStatus: BundleStatus.ARRIVED,
                    currentPostCode: postalCode
                },
            });
            console.log("Bundles queried", res)
            return res;
        } catch (error) {
            console.error("Error getting bundles:", error);
            throw error;
        }}
        return null
    }

    async findBundle(postalCode: string): Promise <Bundle[]>{
        console.log("in find bundle")
        try{
            const res = await prisma.bundle.findMany({
                where:{
                    destPostalCode : postalCode
                }
            })
            console.log("bundle found" , res)
            return res
        }catch(error){
            throw error
        }
    }

    async createBundle(destPostalCode: string, sourcePostalCode: string, bundleRoute: string[]): Promise<number>{
        console.log("in create bundle")
        try{
            const res = await prisma.bundle.create({
                data: { 
                destPostalCode: destPostalCode,
                currentPostCode : sourcePostalCode,
                route : bundleRoute,
                date: new Date(),
                bundleStatus: BundleStatus.CREATED
            },
                
            })
            console.log("bundle created", res)
            return res.bundleID
        }catch(error){
            throw error
        }
    }
    
    async updateBundle(bundleID: number){
        console.log("in create bundle")
        try{
            const res = await prisma.bundle.update({
               where:{bundleID: bundleID},
               data:{bundleStatus: BundleStatus.DISTRIBUTED}
            })
            console.log("bundle created", res)
            return res.bundleID
        }catch(error){
            throw error
        }
    }
}
export {BundleRepository}