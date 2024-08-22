import {Prisma, PrismaClient, Bundle} from "@prisma/client"
const prisma = new PrismaClient();
class BundleRepository{
    async getBundles(postalCode: string): Promise<Bundle[]> {
        try {
            const res = await prisma.bundle.findMany({
                where:{
                    destPostalCode: postalCode,
                },
            });
            console.log("Bundles queried", res)
            return res;
        } catch (error) {
            console.error("Error getting bundles:", error);
            throw error;
        }
    }
}
export {BundleRepository}