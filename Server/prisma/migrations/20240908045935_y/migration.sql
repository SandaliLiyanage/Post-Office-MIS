/*
  Warnings:

  - You are about to drop the column `mailCategoryID` on the `Mail` table. All the data in the column will be lost.
  - The primary key for the `MailCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryName` on the `MailCategory` table. All the data in the column will be lost.
  - You are about to drop the column `mailCategoryID` on the `MailCategory` table. All the data in the column will be lost.
  - Added the required column `mailCategoryName` to the `Mail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mailCategoryName` to the `MailCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mail" DROP CONSTRAINT "Mail_mailCategoryID_fkey";

-- AlterTable
ALTER TABLE "Mail" DROP COLUMN "mailCategoryID",
ADD COLUMN     "mailCategoryName" TEXT NOT NULL,
ALTER COLUMN "mailstatus" SET DEFAULT 'IN_TRANSIT';

-- AlterTable
ALTER TABLE "MailCategory" DROP CONSTRAINT "MailCategory_pkey",
DROP COLUMN "categoryName",
DROP COLUMN "mailCategoryID",
ADD COLUMN     "mailCategoryName" TEXT NOT NULL,
ADD CONSTRAINT "MailCategory_pkey" PRIMARY KEY ("mailCategoryName");

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_mailCategoryName_fkey" FOREIGN KEY ("mailCategoryName") REFERENCES "MailCategory"("mailCategoryName") ON DELETE RESTRICT ON UPDATE CASCADE;
