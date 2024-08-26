import {Router} from 'express';
import AddressController from '../controllers/addresscontroller';

const router = Router();
router.post('/getAddress', AddressController);
export default router;