import BundleService from "../services/bundleservice";
import { Request, Response } from "express";
import { BundleRepository } from "../repositeries/bundlerepository";
import PostOfficeRepository from "../repositeries/postofficerepository";

const bundleservice = new BundleService();
const bundleRepository = new BundleRepository();
const postOfficeRepository = new PostOfficeRepository();

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
    console.log("arrived bundles");
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
    const employeeID = req.query.employeeID as string; // Extract employeeID from query params
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" });
    }
    console.log("created bundles");
    const bundles = await bundleRepository.getCreatedBundles2(employeeID);

    if (!bundles) {
      return res.status(404).json({ error: "No bundles found" });
    }

    return res.status(200).json(bundles); // Send bundles as JSON response
  } catch (error) {
    console.error("Error in getArrivedBundles controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getDispatchedBundles = async (req: Request, res: Response) => {
  try {
    const employeeID = req.query.employeeID as string; // Extract employeeID from query params
    if (!employeeID) {
      return res.status(400).json({ error: "Employee ID is required" });
    }
    console.log("dispatched bundles");
    const bundles = await bundleRepository.getDispatchedBundles(employeeID);

    if (!bundles) {
      return res.status(404).json({ error: "No bundles found" });
    }

    console.log("Dispatched bundles:", bundles);
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
    console.log("distributed bundles");
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

// Update mail status
export const updateBundleStatus2 = async (req: Request, res: Response) => {
  const { bundleID, newStatus } = req.body;

  try {
    let updatedBundle;
    updatedBundle = await bundleRepository.updateBundleStatus(
      bundleID,
      newStatus
    );
    res.status(200).json(updatedBundle);
  } catch (error) {
    console.error("Error updating mail status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPostOfficeName = async (req: Request, res: Response) => {
  const { postalCode } = req.params;

  try {
    // Call the repository function to get the post office name
    const postOffice = await postOfficeRepository.getPostOfficeName(postalCode);

    if (!postOffice) {
      return res.status(404).json({ message: "Post office not found" });
    }

    return res.status(200).json({ postOfficeName: postOffice.postOfficeName });
  } catch (error) {
    console.error("Error fetching post office:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { CreatedBundles, DeliveryBundles, UpdateBundleStatus };
