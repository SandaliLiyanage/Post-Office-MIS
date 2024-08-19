import {Router} from 'express';
import { Login } from '../controllers/authcontroller';

const router = Router();
router.post('/login', Login);
export default router;