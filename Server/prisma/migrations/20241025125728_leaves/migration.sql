/*
  Warnings:

  - The primary key for the `Leave` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Leave" DROP CONSTRAINT "Leave_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Leave_pkey" PRIMARY KEY ("id");
