import {
    CalculatePrice,
  } from "../controllers/mailcontroller";
import { Router } from "express";
import { getTrackingDetails } from "../controllers/mailcontroller";

const router = Router();
console.log("in public routes")
router.post("/calculatePrice", CalculatePrice);
router.post("/track", getTrackingDetails);
export default router;
