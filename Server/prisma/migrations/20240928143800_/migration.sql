/*
  Warnings:

  - Made the column `price` on table `Mail` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Mail" ALTER COLUMN "price" SET NOT NULL;
