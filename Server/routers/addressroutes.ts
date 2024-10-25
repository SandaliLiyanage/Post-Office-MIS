import { Router } from "express";
import { AddAddress } from "../controllers/addresscontroller";
import { getUnverifiedAddresses } from "../controllers/addresscontroller";
import { updateAddressLocation } from "../controllers/addresscontroller";
const router = Router();

// router.use(authService.authorize);
router.post("/addAddress", AddAddress);
router.get("/getUnverifiedAddresses", getUnverifiedAddresses);
router.post("/updateAddressLocation", updateAddressLocation);

export default router;
