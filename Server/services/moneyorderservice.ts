import MoneyOrderRepository from '../repositeries/moneyorderrepository';
import { PaymentStatus } from '@prisma/client';

class MoneyOrderService {
  private moneyOrderRepository: MoneyOrderRepository;

  constructor() {
    this.moneyOrderRepository = new MoneyOrderRepository();
  }

  // Create a new money order
  async createMoneyOrder(orderData: any) {
    const moneyOrder = await this.moneyOrderRepository.createMoneyOrder(orderData);
    return moneyOrder;
  }

  // Update payment status after successful payment
  async updatePaymentStatus(orderId: number, status: PaymentStatus, transactionId?: string) {
    const updatedOrder = await this.moneyOrderRepository.updateOrderStatus(orderId, status, transactionId);
    return updatedOrder;
  }

  // PayHere webhook to update payment status
  async handlePayHereWebhook(webhookData: any) {
    const { order_id, payment_status, payhere_reference_no } = webhookData;
    
    if (!order_id || !payment_status) {
      throw new Error('Invalid webhook data');
    }

    let status: PaymentStatus;
    if (payment_status === '2') {
      status = PaymentStatus.COMPLETED; // 2 in PayHere means completed
    } else {
      status = PaymentStatus.FAILED;
    }

    const updatedOrder = await this.updatePaymentStatus(order_id, status, payhere_reference_no);
    return updatedOrder;
  }
}

export default MoneyOrderService;
