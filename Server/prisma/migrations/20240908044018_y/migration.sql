/*
  Warnings:

  - You are about to drop the column `telephone` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `recepientTelephone` to the `Mail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mail" ADD COLUMN     "recepientTelephone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "telephone",
ADD COLUMN     "customerTelephone" TEXT;
