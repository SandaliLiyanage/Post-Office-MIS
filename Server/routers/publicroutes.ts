import {
    CalculatePrice,
  } from "../controllers/mailcontroller";
import { Router } from "express";
import { getTrackingDetails } from "../controllers/mailcontroller";
import { estimateDeliveryTime } from "../controllers/mailcontroller";

const router = Router();
console.log("in public routes")
router.post("/calculatePrice", CalculatePrice);
router.post("/track", getTrackingDetails);
router.post("/estimate-delivery-time", estimateDeliveryTime);

export default router;
