import CustomerRepository from "../repositeries/customerrepository"
const customerRepository = CustomerRepository.getInstance()

type Customer = {
    customerID: number;
    postalCode: string;
    customerName: string;
    telephone: string | null;
    addressID: number;
}


class CustomerService{


    async storeCustomer (postalCode: string, customerName: string, telephone: string, addressID: number):Promise<Customer> {
        try{
            const storeCustomer = await customerRepository.createCustomer(postalCode, customerName, telephone, addressID );
            return storeCustomer;
        }catch(error){
            throw error
        }
        
    }
}


export default CustomerService;

    // private static instance: CustomerService;
    //     static getInstance(): CustomerService{
    //         if(!CustomerService.instance){
    //             CustomerService.instance = new CustomerService();
    //         }
    //         return CustomerService.instance;
    //     }