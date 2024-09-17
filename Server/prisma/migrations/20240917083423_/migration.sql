/*
  Warnings:

  - You are about to drop the column `used` on the `OTP` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeID,unused,expiresAt,createdAt]` on the table `OTP` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OTP_employeeID_used_key";

-- AlterTable
ALTER TABLE "OTP" DROP COLUMN "used",
ADD COLUMN     "unused" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "OTP_employeeID_unused_expiresAt_createdAt_key" ON "OTP"("employeeID", "unused", "expiresAt", "createdAt");
