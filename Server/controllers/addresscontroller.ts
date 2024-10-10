import { Request, Response } from 'express';
import AdderessService from "../services/addressservice"
import { AddressRepository } from '../repositeries/addressrepository';
const addressRepository = new AddressRepository();
const addressService = new AdderessService(addressRepository);

const Address = async (req: Request, res: Response) => {
    const search = req.body.search
    const addressList = await addressService.searchSuggestions(search);
    console.log("In the address controller", addressList)
    res.send(addressList);	
}
export default Address;