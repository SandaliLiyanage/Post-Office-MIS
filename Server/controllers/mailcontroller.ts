import { Request, Response } from "express";
import { MailRepository } from "../repositeries/mailrepository";
import {BundleRepository} from "../repositeries/bundlerepository";

const mailRepository = new MailRepository();
const bundleRepository = new BundleRepository();
const CalculatePrice = async (req: Request, res: Response) =>  {
    console.log("Request received in controller");
    const {mailType, weight} = req.body; 
    const result = await mailRepository.calculatePrice(mailType, weight);  
    return res.status(200).json(result); 
}

const MailBundles = async (req: Request, res: Response) => {
    console.log("Request received in mail bundle controller");
    const {postalCode} = req.body;
    const result = await bundleRepository.getBundles(postalCode);
    console.log("Bundles received in controller:", result);
    return res.status(200).json(result);
}
const Mails = async(req: Request, res: Response) =>{
    console.log("Request received in mail");
    const {postalCode} = req.body;
    const result = await mailRepository.getMail(postalCode);
    return res.status(200).json(result);
}


export {CalculatePrice, MailBundles, Mails};    