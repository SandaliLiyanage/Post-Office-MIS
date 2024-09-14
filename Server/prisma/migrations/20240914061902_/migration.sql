/*
  Warnings:

  - You are about to drop the column `mailCategoryName` on the `Mail` table. All the data in the column will be lost.
  - You are about to drop the `MailCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mailType` to the `Mail` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MailType" AS ENUM ('NORMAL_MAIL', 'BULK_MAIL', 'REGISTERED_MAIL', 'COURIER');

-- DropForeignKey
ALTER TABLE "Mail" DROP CONSTRAINT "Mail_mailCategoryName_fkey";

-- AlterTable
ALTER TABLE "Mail" DROP COLUMN "mailCategoryName",
ADD COLUMN     "mailType" "MailType" NOT NULL;

-- DropTable
DROP TABLE "MailCategory";
