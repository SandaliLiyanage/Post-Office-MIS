/*
  Warnings:

  - Added the required column `currentPostCode` to the `Bundle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bundle" ADD COLUMN     "currentPostCode" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Bundle" ADD CONSTRAINT "Bundle_currentPostCode_fkey" FOREIGN KEY ("currentPostCode") REFERENCES "PostOffice"("postalCode") ON DELETE RESTRICT ON UPDATE CASCADE;
