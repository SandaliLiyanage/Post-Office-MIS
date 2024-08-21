/*
  Warnings:

  - You are about to drop the column `employee_name` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `post_officeID` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `employeeName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "employee_name",
DROP COLUMN "post_officeID",
ADD COLUMN     "employeeName" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_postalCode_fkey" FOREIGN KEY ("postalCode") REFERENCES "PostOffice"("postalCode") ON DELETE RESTRICT ON UPDATE CASCADE;
