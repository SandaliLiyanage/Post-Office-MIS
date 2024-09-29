import {Router} from 'express';
import { getAreaDet } from '../controllers/areacontroller';

const router = Router();
console.log("in area routes")
router.post("/areaDet", getAreaDet)
export default router;