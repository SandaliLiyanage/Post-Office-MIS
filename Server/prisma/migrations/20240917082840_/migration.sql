/*
  Warnings:

  - The primary key for the `OTP` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `otpID` on the `OTP` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeID,used]` on the table `OTP` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "OTP" DROP CONSTRAINT "OTP_pkey",
DROP COLUMN "otpID";

-- CreateIndex
CREATE UNIQUE INDEX "OTP_employeeID_used_key" ON "OTP"("employeeID", "used");
