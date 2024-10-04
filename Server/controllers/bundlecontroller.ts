import BundleService from "../services/bundleservice";
import { Request, Response } from "express";
import { BundleRepository } from "../repositeries/bundlerepository";

const bundleservice = new BundleService();
const bundleRepository = new BundleRepository();

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

const UpdateBundleStatus = async (req: Request, res: Response) => {
  console.log("in bundle update controller", req);
  const { postalCode, bundleID } = req.body;
  console.log(bundleID, "bundle ID received to update");
  const response = await bundleservice.updateStatus(bundleID);
};

export const getArrivedBundles = async (req: Request, res: Response) => {
  try {
    const employeeID = req.query.employeeID as string; // Extract employeeID from query params
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" });
    }
    console.log("aaaaaaaaaaaa");
    const bundles = await bundleRepository.getArrivedBundles(employeeID);

    if (!bundles) {
      return res.status(404).json({ error: "No bundles found" });
    }

    return res.status(200).json(bundles); // Send bundles as JSON response
  } catch (error) {
    console.error("Error in getArrivedBundles controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getCreatedBundles = async (req: Request, res: Response) => {
  try {
    const postalCode = req.query.postalCode as string; // Extract postalCode from query params
    if (!postalCode) {
      return res.status(400).json({ error: "Postal code is required" });
    }

    const bundles = await bundleRepository.getCreatedBundles(postalCode);

    if (!bundles) {
      return res.status(404).json({ error: "No bundles found" });
    }

    return res.status(200).json(bundles); // Send bundles as JSON response
  } catch (error) {
    console.error("Error in getCreatedBundles controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getDispatchedBundles = async (req: Request, res: Response) => {
  try {
    const employeeID = req.query.employeeID as string; // Extract employeeID from query params
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" });
    }

    const bundles = await bundleRepository.getDispatchedBundles(employeeID);

    if (!bundles) {
      return res.status(404).json({ error: "No bundles found" });
    }

    return res.status(200).json(bundles); // Send bundles as JSON response
  } catch (error) {
    console.error("Error in getDispatchedBundles controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getDistributedBundles = async (req: Request, res: Response) => {
  try {
    const employeeID = req.query.employeeID as string; // Extract employeeID from query params
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" });
    }

    const bundles = await bundleRepository.getDistributedBundles(employeeID);

    if (!bundles) {
      return res.status(404).json({ error: "No bundles found" });
    }

    return res.status(200).json(bundles); // Send bundles as JSON response
  } catch (error) {
    console.error("Error in getDistributedBundles controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { CreatedBundles, DeliveryBundles, UpdateBundleStatus };
