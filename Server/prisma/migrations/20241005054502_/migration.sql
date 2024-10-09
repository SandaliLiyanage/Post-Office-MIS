-- DropForeignKey
ALTER TABLE "Mail" DROP CONSTRAINT "Mail_bundleID_fkey";

-- AlterTable
ALTER TABLE "Mail" ALTER COLUMN "bundleID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_bundleID_fkey" FOREIGN KEY ("bundleID") REFERENCES "Bundle"("bundleID") ON DELETE SET NULL ON UPDATE CASCADE;
