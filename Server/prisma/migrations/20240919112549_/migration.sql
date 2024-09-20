/*
  Warnings:

  - Made the column `headOfficeID` on table `PostOffice` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PostOffice" ALTER COLUMN "headOfficeID" SET NOT NULL;
