import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteAllRecords() {
  try {
    await prisma.mail.deleteMany({});
    await prisma.bundle.deleteMany({});
    await prisma.transaction.deleteMany({});
    await prisma.address.deleteMany({});
    await prisma.area.deleteMany({});
    await prisma.leave.deleteMany({});
    await prisma.feedback.deleteMany({});
    await prisma.employee.deleteMany({});
    await prisma.postOffice.deleteMany({});
    console.log("All records deleted:");
  } catch (error) {
    console.error("Error deleting records:", error);
  } finally {
    await prisma.$disconnect(); // Always disconnect after operations
  }
}

deleteAllRecords();
