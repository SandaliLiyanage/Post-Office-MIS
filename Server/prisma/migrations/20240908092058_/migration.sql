/*
  Warnings:

  - The primary key for the `Mail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `barcodeID` on the `Mail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mail" DROP CONSTRAINT "Mail_pkey",
DROP COLUMN "barcodeID",
ADD COLUMN     "mailID" SERIAL NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2),
ADD CONSTRAINT "Mail_pkey" PRIMARY KEY ("mailID");
