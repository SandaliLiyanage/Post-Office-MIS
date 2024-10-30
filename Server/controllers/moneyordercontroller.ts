import { Request, Response } from 'express';
import MoneyOrderService from '../services/moneyorderservice';
import { PaymentStatus } from '@prisma/client';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51QBsL1GhXMGZ3V9gkm03eLRzuGxGnuw6ZNxn6toOqJ6ttwpATadCaZJIk6H6CksB59YUYM3Iy3vcAuCzXBqm0Lds00U7gEIU3J'); // Test secret key

interface MoneyOrderRequest {
  recipientName: string;
  recipientAddress: string;
  recipientNIC: string;
  amount: number;
  senderName: string;
  senderPhoneNumber: string;
}

class MoneyOrderController {
  private moneyOrderService: MoneyOrderService;

  constructor() {
    this.moneyOrderService = new MoneyOrderService();
  }

  // Create a new money order
  async createMoneyOrder(req: Request, res: Response) {
    try {
      const orderData: MoneyOrderRequest = req.body;

      // Validate required fields
      if (!orderData.recipientName || !orderData.amount || !orderData.senderName) {
        return res.status(400).json({ message: 'Required fields are missing' });
      }

      // Create the money order in the database
      const moneyOrder = await this.moneyOrderService.createMoneyOrder(orderData);
      const orderId = moneyOrder.id; // Assuming moneyOrder has an id field
      console.log(orderId)
      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: orderData.amount * 100, // Amount in cents
        currency: 'usd', // Use 'usd' in test mode, change to 'lkr' in production
        metadata: {
          recipientName: orderData.recipientName,
          senderName: orderData.senderName,
          orderId: orderId.toString(), // Store the real orderId
        },
      });

      // Return the payment intent ID
      return res.status(201).json({ id: paymentIntent.id, clientSecret: paymentIntent.client_secret ,orderID:orderId});
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }

  // Stripe payment webhook handler
  async handleStripeWebhook(req: Request, res: Response) {
    let event;

    // Check if testing locally by detecting the absence of stripe-signature
    if (!req.headers['stripe-signature']) {
      event = req.body; // Use the parsed body directly for testing
    } else {
      const sig = req.headers['stripe-signature'];
      const webhookSecret = 'whsec_50D6U0hb9RlFUN3EZUpDJ0Lllj64Pj8b'; // Replace with actual webhook secret

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Webhook error';
        return res.status(400).send(`Webhook Error: ${errorMessage}`);
      }
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata.orderId;

        await this.moneyOrderService.updatePaymentStatus(
          Number(orderId),
          PaymentStatus.COMPLETED,
          paymentIntent.id
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true,details:event.data.object as Stripe.PaymentIntent });
  }
}

export default MoneyOrderController;


