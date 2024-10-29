/*
  Warnings:

  - The primary key for the `Leave` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Leave` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Leave" DROP CONSTRAINT "Leave_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Leave_pkey" PRIMARY KEY ("employeeID");
