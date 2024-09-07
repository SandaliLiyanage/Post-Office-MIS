import {Prisma, PrismaClient, Customer} from "@prisma/client"
const prisma = new PrismaClient();




class CustomerRepository{
    	private static instance: CustomerRepository;
        static getInstance(): CustomerRepository{
            if(!CustomerRepository.instance){
                CustomerRepository.instance = new CustomerRepository();
            }
            return CustomerRepository.instance;

        }
        async createCustomer(postalCode:string, customerName: string, telephone:string, addressID: number):  Promise <Customer>{
            console.log("in create customer", postalCode, customerName, telephone, addressID)
            const result = await prisma.customer.create({
                data:{
                    postalCode: postalCode,
                    customerName: customerName,
                    telephone: telephone,
                    addressID: addressID
                }

            })
            // const result = await prisma.$queryRaw`INSERT INTO "Customer" ("customerName", "telephone","addressID", "postalCode") VALUES ("customerName", "telephone", "addressID", "postalCode")`
               
              return result
        }
      
}

export default CustomerRepository