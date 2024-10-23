import { PrismaClient, PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

class MoneyOrderRepository {
  // Create a new money order
  async createMoneyOrder(orderData: any) {
    const { 
      recipientName, 
      recipientAddress, 
      recipientNIC, 
      amount, 
      senderName, 
      senderPhoneNumber 
    } = orderData;

    const moneyOrder = await prisma.moneyOrder.create({
      data: {
        recipientName,
        recipientAddress,
        recipientNIC,
        amount,
        senderName,
        senderPhoneNumber,
        paymentStatus: PaymentStatus.PENDING, // Default to PENDING status
      },
    });
    
    return moneyOrder;
  }

  // Update the status and transaction ID for a money order after payment
  async updateOrderStatus(orderId: number, status: PaymentStatus, transactionId?: string) {
    const moneyOrder = await prisma.moneyOrder.update({
      where: { id: orderId },
      data: { 
        paymentStatus: status,
        transactionId: transactionId || undefined, // Update transactionId if provided
      },
    });
    
    return moneyOrder;
  }

  // Retrieve a money order by its ID
  async getMoneyOrderById(orderId: number) {
    const moneyOrder = await prisma.moneyOrder.findUnique({
      where: { id: orderId },
    });
    
    return moneyOrder;
  }

  // Retrieve money orders by status (optional filtering by status)
  async getMoneyOrdersByStatus(status: PaymentStatus) {
    const moneyOrders = await prisma.moneyOrder.findMany({
      where: { paymentStatus: status },
    });
    
    return moneyOrders;
  }
}

export default MoneyOrderRepository;
