import { Request, Response } from 'express';
import CustomerService from '../services/customerservice';

export const CustomerDetails = async (req: Request, res: Response) => {
    const addressService = new CustomerService();
    const {addressID, postalCode} = req.body;
    const {customerName, address, telephone} = req.body.values;
    console.log(addressID, postalCode, customerName, address, telephone);
    const result = await addressService.storeCustomer(postalCode, customerName, telephone, addressID);
    const customerID = result.customerID
    return res.json({customerID: customerID});
};

   
