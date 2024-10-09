import { Router } from "express";

// import {CustomerDetails} from '../controllers/customerdetails';

import AuthService from "../services/authservice";
import { CreatedBundles } from "../controllers/bundlecontroller";
import { DeliveryBundles } from "../controllers/bundlecontroller";
import { UpdateBundleStatus } from "../controllers/bundlecontroller";
const authService = new AuthService();

const router = Router();
router.use(authService.authorize);
router.post("/createdBundles", CreatedBundles);
router.post("/deliveryBundles", DeliveryBundles);
router.post("/UpdateBundleStatus", UpdateBundleStatus)

export default router;
