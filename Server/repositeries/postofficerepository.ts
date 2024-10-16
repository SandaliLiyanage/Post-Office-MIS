import {Prisma, PrismaClient, PostOffice} from "@prisma/client"
import { PrismaSingleton } from "./prismasingleton";
class PostOfficeRepository{
    private prisma = PrismaSingleton.getInstance();
    constructor(){
        this.prisma = PrismaSingleton.getInstance();
    }
    async getHeadOffice(postalCode: string): Promise<string |null>{
        try{
          const headOffice = await this.prisma.postOffice.findUnique({
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
        const name = await this.prisma.postOffice.findUnique({
          where: {
            postalCode: postalCode
          },
          select: {
            postOfficeName: true
          }
        })
      return name;
      }
}
export default PostOfficeRepository