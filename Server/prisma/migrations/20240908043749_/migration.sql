/*
  Warnings:

  - You are about to drop the column `recepientID` on the `Mail` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recepientAddressID` to the `Mail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recepientName` to the `Mail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerAddressID` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_addressID_fkey";

-- DropForeignKey
ALTER TABLE "Mail" DROP CONSTRAINT "Mail_recepientID_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_customerID_fkey";

-- AlterTable
ALTER TABLE "Mail" DROP COLUMN "recepientID",
ADD COLUMN     "recepientAddressID" INTEGER NOT NULL,
ADD COLUMN     "recepientName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "customerAddressID" INTEGER NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT;

-- DropTable
DROP TABLE "Customer";

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_recepientAddressID_fkey" FOREIGN KEY ("recepientAddressID") REFERENCES "Address"("addressID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_customerAddressID_fkey" FOREIGN KEY ("customerAddressID") REFERENCES "Address"("addressID") ON DELETE RESTRICT ON UPDATE CASCADE;
