import { Request, Response } from 'express';
const AddressController = async (req: Request, res: Response) => {
    console.log("Address details received:", req.body);
    res.send({address: [440, 441]});	
}
export default AddressController;