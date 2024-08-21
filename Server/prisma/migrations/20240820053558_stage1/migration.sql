/*
  Warnings:

  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `employee_id` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeID` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_name` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_officeID` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('POSTMASTER', 'SUPERVISOR', 'RECEPTIONIST', 'DISPATCHER', 'POSTMAN');

-- CreateEnum
CREATE TYPE "PostOfficeCategory" AS ENUM ('HEAD_OFFICE', 'SUB_OFFICE');

-- CreateEnum
CREATE TYPE "MailCategory" AS ENUM ('LETTER', 'COURIER', 'MONEY_ORDER', 'REGISTERED_MAIL');

-- CreateEnum
CREATE TYPE "MailStatus" AS ENUM ('IN_TRANSIT', 'DELIVERED', 'RETURNED');

-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
DROP COLUMN "employee_id",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "employeeID" TEXT NOT NULL,
ADD COLUMN     "employee_name" TEXT NOT NULL,
ADD COLUMN     "post_officeID" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL,
ADD COLUMN     "telephone" TEXT NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("employeeID");

-- CreateTable
CREATE TABLE "PostOffice" (
    "postalCode" TEXT NOT NULL,
    "postOfficeCategory" "PostOfficeCategory" NOT NULL,
    "postOfficeName" TEXT NOT NULL,
    "headOfficeID" TEXT,

    CONSTRAINT "PostOffice_pkey" PRIMARY KEY ("postalCode")
);

-- CreateTable
CREATE TABLE "Address" (
    "addressID" SERIAL NOT NULL,
    "postalCode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("addressID")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customerID" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,
    "telephone" TEXT,
    "addressID" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerID")
);

-- CreateTable
CREATE TABLE "Mail" (
    "barcodeID" SERIAL NOT NULL,
    "category" "MailCategory" NOT NULL,
    "recepientID" INTEGER NOT NULL,
    "bundleID" INTEGER NOT NULL,
    "postalCode" TEXT NOT NULL,
    "mailstatus" "MailStatus" NOT NULL,
    "transactionID" INTEGER NOT NULL,

    CONSTRAINT "Mail_pkey" PRIMARY KEY ("barcodeID")
);

-- CreateTable
CREATE TABLE "Bundle" (
    "barcodeID" SERIAL NOT NULL,

    CONSTRAINT "Bundle_pkey" PRIMARY KEY ("barcodeID")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionID" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "customerID" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_postalCode_fkey" FOREIGN KEY ("postalCode") REFERENCES "PostOffice"("postalCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES "Address"("addressID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_bundleID_fkey" FOREIGN KEY ("bundleID") REFERENCES "Bundle"("barcodeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_recepientID_fkey" FOREIGN KEY ("recepientID") REFERENCES "Customer"("customerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_postalCode_fkey" FOREIGN KEY ("postalCode") REFERENCES "PostOffice"("postalCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_transactionID_fkey" FOREIGN KEY ("transactionID") REFERENCES "Transaction"("transactionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("customerID") ON DELETE RESTRICT ON UPDATE CASCADE;
