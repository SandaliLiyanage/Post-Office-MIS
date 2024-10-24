import { Router } from 'express';
import MoneyOrderController from '../controllers/moneyordercontroller';

const router = Router();
const moneyOrderController = new MoneyOrderController();

// Route to create a new money order
router.post('/', (req, res) => moneyOrderController.createMoneyOrder(req, res));

// Route for PayHere webhook
router.post('/stripe-webhook', (req, res) => moneyOrderController.handleStripeWebhook(req, res));

export default router;
