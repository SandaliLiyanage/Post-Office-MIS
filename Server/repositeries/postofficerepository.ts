import {Prisma, PrismaClient, PostOffice} from "@prisma/client"
const prisma = new PrismaClient();

class PostOfficeRepository{
    async getHeadOffice(postalCode: string): Promise<string |null>{
        try{
          const headOffice = await prisma.postOffice.findUnique({
            where: {
              postalCode: postalCode
            },
            select: {
              headOfficeID: true
            }
          })
          return headOffice?.headOfficeID || null ;
        }catch(error){

          throw error
        }
      }

      async getPostOfficeName(postalCode: string){
        const name = await prisma.postOffice.findUnique({
          where: {
            postalCode: postalCode
          },
          select: {
            postOfficeName: true
          }
        })
      return name

      }
}
export default PostOfficeRepository