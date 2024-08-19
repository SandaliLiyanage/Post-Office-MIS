/*
  Warnings:

  - You are about to drop the column `email` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `employee_category_id` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `employee_name` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `post_office_id` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `Employee` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Employee_email_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "email",
DROP COLUMN "employee_category_id",
DROP COLUMN "employee_name",
DROP COLUMN "post_office_id",
DROP COLUMN "telephone";
