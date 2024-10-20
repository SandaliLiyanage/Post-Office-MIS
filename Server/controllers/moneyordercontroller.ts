import { Request, Response } from 'express';
import MoneyOrderService from '../services/moneyorderservice';
import { PaymentStatus } from '@prisma/client';

interface MoneyOrderRequest {
  recipientName: string;
  recipientAddress: string;
  recipientNIC: string;
  amount: number;
  senderName: string;
  phoneNumber: string;
}

class MoneyOrderController {
  private moneyOrderService: MoneyOrderService;

  constructor() {
    this.moneyOrderService = new MoneyOrderService();
  }

  // Create a new money order
  async createMoneyOrder(req: Request, res: Response) {
    try {
      // Validate the incoming request body (type-checking)
      const orderData: MoneyOrderRequest = req.body;

      // Validate required fields
      if (!orderData.recipientName || !orderData.amount || !orderData.senderName) {
        return res.status(400).json({ message: 'Required fields are missing' });
      }

      // Call service to create the money order
      const moneyOrder = await this.moneyOrderService.createMoneyOrder(orderData);
      return res.status(201).json(moneyOrder);
    } catch (error: unknown) {
      // Type checking for error message extraction
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }

  // PayHere payment webhook handler
  async payHereWebhook(req: Request, res: Response) {
    try {
      const webhookData = req.body;

      // Call service to handle the PayHere webhook data
      await this.moneyOrderService.handlePayHereWebhook(webhookData);
      return res.status(200).send('Webhook processed successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
}

export default MoneyOrderController;
