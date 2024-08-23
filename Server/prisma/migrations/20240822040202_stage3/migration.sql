/*
  Warnings:

  - The primary key for the `Bundle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `destPostalCode` to the `Bundle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mail" DROP CONSTRAINT "Mail_bundleID_fkey";

-- AlterTable
ALTER TABLE "Bundle" DROP CONSTRAINT "Bundle_pkey",
ADD COLUMN     "bundleID" SERIAL NOT NULL,
ADD COLUMN     "destPostalCode" TEXT NOT NULL,
ALTER COLUMN "barcodeID" DROP DEFAULT,
ADD CONSTRAINT "Bundle_pkey" PRIMARY KEY ("bundleID");
DROP SEQUENCE "Bundle_barcodeID_seq";

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_bundleID_fkey" FOREIGN KEY ("bundleID") REFERENCES "Bundle"("bundleID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bundle" ADD CONSTRAINT "Bundle_destPostalCode_fkey" FOREIGN KEY ("destPostalCode") REFERENCES "PostOffice"("postalCode") ON DELETE RESTRICT ON UPDATE CASCADE;
