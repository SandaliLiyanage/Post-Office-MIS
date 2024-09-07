-- Active: 1725738501051@@127.0.0.1@5432@post_office_mis
/*
  Warnings:

  - You are about to drop the column `category` on the `Mail` table. All the data in the column will be lost.
  - Changed the type of `leaveType` on the `Leave` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `mailCategoryID` to the `Mail` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LeaveType" AS ENUM ('HALF_DAY', 'FULL_DAY');

-- AlterTable
ALTER TABLE "Leave" DROP COLUMN "leaveType",
ADD COLUMN     "leaveType" "LeaveType" NOT NULL;

-- AlterTable
ALTER TABLE "Mail" DROP COLUMN "category",
ADD COLUMN     "mailCategoryID" TEXT NOT NULL,
ADD COLUMN     "weight" DECIMAL(10,2);

-- DropEnum
DROP TYPE "MailCategory";

-- CreateTable
CREATE TABLE "MailCategory" (
    "mailCategoryID" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "PricePer1kg" DECIMAL(10,2),

    CONSTRAINT "MailCategory_pkey" PRIMARY KEY ("mailCategoryID")
);

-- CreateTable
CREATE TABLE "Area" (
    "areaID" INTEGER NOT NULL,
    "areaName" VARCHAR(100) NOT NULL,
    "postalCode" TEXT NOT NULL,
    "employeeID" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("areaID")
);

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_mailCategoryID_fkey" FOREIGN KEY ("mailCategoryID") REFERENCES "MailCategory"("mailCategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_postalCode_fkey" FOREIGN KEY ("postalCode") REFERENCES "PostOffice"("postalCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("employeeID") ON DELETE RESTRICT ON UPDATE CASCADE;
