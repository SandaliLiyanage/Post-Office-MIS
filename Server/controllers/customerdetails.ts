import { Request, Response } from 'express';

export const customerDetails = async (req: Request, res: Response) => {
    console.log("Customer details received:", req.body);
    res.send("Customer details saved");
};