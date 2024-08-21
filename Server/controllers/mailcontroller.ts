import { MailRepository } from "../repositeries/mailRepository";
import { Request, Response } from "express";
const mailService = new MailRepository();

const CalculatePrice = async (req: Request, res: Response) =>  {
    console.log("Request received in controller");
    const {mailType, weight} = req.body; 
    const result = await mailService.calculatePrice(mailType, weight);  
    return res.status(200).json(result); 
}
export {CalculatePrice};