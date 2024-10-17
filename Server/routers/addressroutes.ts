import { Router } from "express";
import { AddAddress } from "../controllers/addresscontroller";
import { getUnverifiedAddresses } from "../controllers/addresscontroller";
const router = Router();

router.post("/addAddress", AddAddress);
router.get("/getUnverifiedAddresses", getUnverifiedAddresses);

export default router;
