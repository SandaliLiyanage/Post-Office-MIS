import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteAllRecords() {
    try {
      const result = await prisma.employee.deleteMany({});
      console.log('All records deleted:', result);
    } catch (error) {
      console.error('Error deleting records:', error);
    } finally {
      await prisma.$disconnect(); // Always disconnect after operations
    }
  }
  
  deleteAllRecords();