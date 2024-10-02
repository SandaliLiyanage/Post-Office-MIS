/*
  Warnings:

  - Added the required column `bundleStatus` to the `Bundle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BundleStatus" AS ENUM ('ARRIVED', 'DISPATCHED', 'DISTRIBUTED');

-- AlterTable
ALTER TABLE "Bundle" ADD COLUMN     "bundleStatus" "BundleStatus" NOT NULL;
