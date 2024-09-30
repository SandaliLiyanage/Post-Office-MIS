import BundleService from "../services/bundleservice";
import { Request, Response } from "express";

const bundleservice = new BundleService();


const CreatedBundles = async (req: Request, res: Response) => {
    console.log("Request received in mail bundle controller", req.body);
    const { postalCode } = req.body;
    const result = await bundleservice.getCreatedBundles(postalCode);
    console.log("Bundles received in controller:", result);
    return res.status(200).json(result);
  };
  
  const DeliveryBundles = async (req: Request, res: Response) => {
    console.log("Request received in mail bundle controller", req.body);
    const { postalCode } = req.body;
    const result = await bundleservice.getDeliveryBundles(postalCode);
    console.log("Bundles received in controller:", result);
    return res.status(200).json(result);
  };

  const UpdateBundleStatus = async (req: Request, res: Response) =>{
    console.log("in bundle update controller", req);
    const {postalCode, bundleID} = req.body
    console.log(bundleID, "bundle ID received to update")
    const response = await bundleservice.updateStatus(bundleID)

  }

export {CreatedBundles, DeliveryBundles, UpdateBundleStatus}