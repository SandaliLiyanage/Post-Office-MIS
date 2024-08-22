/*
  Warnings:

  - The values [LETTER] on the enum `MailCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MailCategory_new" AS ENUM ('NORMAL_MAIL', 'COURIER', 'MONEY_ORDER', 'REGISTERED_MAIL');
ALTER TABLE "Mail" ALTER COLUMN "category" TYPE "MailCategory_new" USING ("category"::text::"MailCategory_new");
ALTER TYPE "MailCategory" RENAME TO "MailCategory_old";
ALTER TYPE "MailCategory_new" RENAME TO "MailCategory";
DROP TYPE "MailCategory_old";
COMMIT;
