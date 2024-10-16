import {Router} from 'express';
import { AddAddress } from '../controllers/addresscontroller';
const router = Router();

router.post("/addAddress", AddAddress)

export default router;
