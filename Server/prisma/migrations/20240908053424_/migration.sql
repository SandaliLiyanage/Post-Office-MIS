/*
  Warnings:

  - You are about to drop the column `postalCode` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `postalCode` to the `Mail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_postalCode_fkey";

-- AlterTable
ALTER TABLE "Mail" ADD COLUMN     "postalCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "postalCode";

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_postalCode_fkey" FOREIGN KEY ("postalCode") REFERENCES "PostOffice"("postalCode") ON DELETE RESTRICT ON UPDATE CASCADE;
