import { Request, Response } from 'express';
import AdderessService from "../services/addressservice"

const addressService = new AdderessService();

const Address = async (req: Request, res: Response) => {
    const search = req.body.search
    const addressList = await addressService.searchSuggestions(search);
    console.log("In the address controller", addressList)
    res.send(addressList);	
}
export default Address;