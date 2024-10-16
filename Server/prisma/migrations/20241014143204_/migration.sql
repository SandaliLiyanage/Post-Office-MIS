/*
  Warnings:

  - You are about to drop the column `status` on the `Leave` table. All the data in the column will be lost.
  - Added the required column `requstedDate` to the `Leave` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leave" DROP COLUMN "status",
ADD COLUMN     "requstedDate" TIMESTAMP(3) NOT NULL;
