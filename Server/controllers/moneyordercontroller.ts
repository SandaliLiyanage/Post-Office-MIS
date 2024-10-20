import { Request, Response } from 'express';
import MoneyOrderService from '../services/moneyorderservice';
import { PaymentStatus } from '@prisma/client';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51QBsL1GhXMGZ3V9gkm03eLRzuGxGnuw6ZNxn6toOqJ6ttwpATadCaZJIk6H6CksB59YUYM3Iy3vcAuCzXBqm0Lds00U7gEIU3J'); // Replace with your Stripe secret key

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
  
      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: orderData.amount * 100, // Amount in cents
        currency: 'lkr', // Replace with your currency
        metadata: { recipientName: orderData.recipientName, senderName: orderData.senderName },
      });
  
      // Optionally store the order data and payment intent ID in your database
  
      return res.status(201).json({ id: paymentIntent.id });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }

  // PayHere payment webhook handler
  async handleStripeWebhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = 'whsec_waWWxf9wScPNBxTPN9Nc0G3m4ykLTtrI'; // Replace with your Stripe webhook secret
    
    if (!sig) {
        return res.status(400).send('Missing Stripe signature');
      }
    
    let event;
  
    try {
        // Use express.raw() middleware for webhook endpoint
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Webhook error';
        return res.status(400).send(`Webhook Error: ${errorMessage}`);
      }
  
    switch (event.type) {
    case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata.orderId;

        // Ensure orderId is handled correctly (convert to number if needed)
        await this.moneyOrderService.updatePaymentStatus(Number(orderId), PaymentStatus.COMPLETED, paymentIntent.id);
        break;
    // Handle other event types as needed
    default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.json({ received: true });
  }
  
}

export default MoneyOrderController;
