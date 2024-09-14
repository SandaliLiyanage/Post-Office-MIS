/*
  Warnings:

  - The values [BULK_MAIL] on the enum `MailType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MailType_new" AS ENUM ('NORMAL_MAIL', 'REGISTERED_MAIL', 'COURIER');
ALTER TABLE "Mail" ALTER COLUMN "mailType" TYPE "MailType_new" USING ("mailType"::text::"MailType_new");
ALTER TYPE "MailType" RENAME TO "MailType_old";
ALTER TYPE "MailType_new" RENAME TO "MailType";
DROP TYPE "MailType_old";
COMMIT;
