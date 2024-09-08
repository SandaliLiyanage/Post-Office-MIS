/*
  Warnings:

  - You are about to drop the column `postalCode` on the `Mail` table. All the data in the column will be lost.
  - Added the required column `postalCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mail" DROP CONSTRAINT "Mail_postalCode_fkey";

-- AlterTable
ALTER TABLE "Bundle" ALTER COLUMN "barcodeID" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Mail" DROP COLUMN "postalCode";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "postalCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_postalCode_fkey" FOREIGN KEY ("postalCode") REFERENCES "PostOffice"("postalCode") ON DELETE RESTRICT ON UPDATE CASCADE;
