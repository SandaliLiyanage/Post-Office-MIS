-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "areaID" INTEGER;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_areaID_fkey" FOREIGN KEY ("areaID") REFERENCES "Area"("areaID") ON DELETE SET NULL ON UPDATE CASCADE;
