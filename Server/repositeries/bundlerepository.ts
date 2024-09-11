import {Prisma, PrismaClient, Bundle} from "@prisma/client"
const prisma = new PrismaClient();
class BundleRepository{
    async getBundles(postalCode: string): Promise<Bundle[]> {
        try {
            const res = await prisma.bundle.findMany({
                where:{
                    currentPostCode: postalCode,
                },
            });
            console.log("Bundles queried", res)
            return res;
        } catch (error) {
            console.error("Error getting bundles:", error);
            throw error;
        }
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

    async createBundle(barcodeID: number, destPostalCode: string, sourcePostalCode: string): Promise<number>{
        console.log("in create bundle")
        try{
            const res = await prisma.bundle.create({
                data: { 
                barcodeID:barcodeID,
                destPostalCode: destPostalCode,
                currentPostCode : sourcePostalCode, 
                date: new Date()}
            })
            console.log("bundle created", res)
            return res.bundleID
        }catch(error){
            throw error
        }
    }
}
export {BundleRepository}