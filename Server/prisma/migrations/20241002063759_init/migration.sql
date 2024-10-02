-- CreateTable
CREATE TABLE "MoneyOrder" (
    "id" SERIAL NOT NULL,
    "recipientName" TEXT NOT NULL,
    "recipientAddress" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoneyOrder_pkey" PRIMARY KEY ("id")
);
