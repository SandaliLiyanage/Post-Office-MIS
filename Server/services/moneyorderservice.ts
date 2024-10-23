import MoneyOrderRepository from '../repositeries/moneyorderrepository'; // Fixed typo in import path
import { PaymentStatus } from '@prisma/client';

interface MoneyOrderData {
  recipientName: string;
  recipientAddress: string;
  recipientNIC: string;
  amount: number;
  senderName: string;
  senderPhoneNumber: string; 
}

class MoneyOrderService {
  private moneyOrderRepository: MoneyOrderRepository;

  constructor() {
    this.moneyOrderRepository = new MoneyOrderRepository();
  }

  // Create a new money order
  async createMoneyOrder(orderData: MoneyOrderData) {
    const moneyOrder = await this.moneyOrderRepository.createMoneyOrder(orderData);
    return moneyOrder;
  }

  // Update payment status after successful payment
  async updatePaymentStatus(orderId: number, status: PaymentStatus, transactionId?: string) {
    const updatedOrder = await this.moneyOrderRepository.updateOrderStatus(orderId, status, transactionId);
    return updatedOrder;
  }

  // Stripe webhook to update payment status
  async handleStripeWebhook(event: any) {
    const paymentIntent = event.data.object;

    if (!paymentIntent || !paymentIntent.metadata.orderId) {
      throw new Error('Invalid webhook data');
    }

    const orderId = Number(paymentIntent.metadata.orderId);
    let status: PaymentStatus;

    if (paymentIntent.status === 'succeeded') {
      status = PaymentStatus.COMPLETED; // Payment succeeded
    } else {
      status = PaymentStatus.FAILED; // Payment failed
    }

    const updatedOrder = await this.updatePaymentStatus(orderId, status, paymentIntent.id);
    return updatedOrder;
  }
}

export default MoneyOrderService;
