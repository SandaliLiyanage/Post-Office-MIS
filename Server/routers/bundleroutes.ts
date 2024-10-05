import { Router } from "express";
// import {CustomerDetails} from '../controllers/customerdetails';

import AuthService from "../services/authservice";
import {
  CreatedBundles,
  getPostOfficeName,
} from "../controllers/bundlecontroller";
import { DeliveryBundles } from "../controllers/bundlecontroller";
import { UpdateBundleStatus } from "../controllers/bundlecontroller";
import { getArrivedBundles } from "../controllers/bundlecontroller";
import { getDistributedBundles } from "../controllers/bundlecontroller";
import { getCreatedBundles } from "../controllers/bundlecontroller";
import { getDispatchedBundles } from "../controllers/bundlecontroller";
import { updateBundleStatus2 } from "../controllers/bundlecontroller";
import { findBundle } from "../controllers/bundlecontroller";
const authService = new AuthService();

const router = Router();
router.post("/createdBundles", CreatedBundles);
router.post("/deliveryBundles", DeliveryBundles);
router.post("/UpdateBundleStatus", UpdateBundleStatus);
router.get("/arrived", getArrivedBundles);
router.get("/created", getCreatedBundles);
router.get("/dispatched", getDispatchedBundles);
router.get("/distributed", getDistributedBundles);
router.patch("/update-status", updateBundleStatus2);
router.get("/postoffice", getPostOfficeName);
router.get("/find", findBundle);

export default router;
