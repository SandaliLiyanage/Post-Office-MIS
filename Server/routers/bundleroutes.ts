import { Router } from "express";
// import {CustomerDetails} from '../controllers/customerdetails';

import AuthService from "../services/authservice";
import { CreatedBundles } from "../controllers/bundlecontroller";
import { DeliveryBundles } from "../controllers/bundlecontroller";
import { UpdateBundleStatus } from "../controllers/bundlecontroller";
import { getArrivedBundles } from "../controllers/bundlecontroller";
import { getDistributedBundles } from "../controllers/bundlecontroller";
import { getCreatedBundles } from "../controllers/bundlecontroller";
const authService = new AuthService();

const router = Router();
router.post("/createdBundles", CreatedBundles);
router.post("/deliveryBundles", DeliveryBundles);
router.post("/UpdateBundleStatus", UpdateBundleStatus);
router.get("/arrived", getArrivedBundles);
router.get("/distributed", getDistributedBundles);
router.get("/created", getCreatedBundles);

export default router;
