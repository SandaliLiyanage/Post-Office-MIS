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
import { EmployeeRepository } from "../repositeries/employeerepository";
import BcryptService from "../services/cryptservice";
import JwtService from "../services/jwtservice";
import SessionStore from "../services/sessionstore";
import { getCreatedBundlesCount } from "../controllers/bundlecontroller";
import { getArrivedBundlesCount } from "../controllers/bundlecontroller";
import { updateAsArrived } from "../controllers/bundlecontroller";

const employeRepository = new EmployeeRepository();
const cryptService = new BcryptService();
const session = new SessionStore();
const jwtToken = new JwtService();
const authService = new AuthService(
  employeRepository,
  cryptService,
  session,
  jwtToken
);

const router = Router();
// router.use(authService.authorize);
router.post("/createdBundles", CreatedBundles);
router.post("/deliveryBundles", DeliveryBundles);
router.post("/updateBundleStatus", UpdateBundleStatus);
router.get("/arrived", getArrivedBundles);
router.get("/created", getCreatedBundles);
router.get("/dispatched", getDispatchedBundles);
router.get("/distributed", getDistributedBundles);
router.patch("/update-status", updateBundleStatus2);
router.get("/postoffice", getPostOfficeName);
router.get("/find", findBundle);
router.get("/created-count", getCreatedBundlesCount);
router.get("/arrived-count", getArrivedBundlesCount);
router.patch("/update-arrived", updateAsArrived);

export default router;
