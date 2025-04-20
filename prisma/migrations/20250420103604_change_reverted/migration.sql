/*
  Warnings:

  - The `type` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "mode" "EventMode" NOT NULL DEFAULT 'offline',
DROP COLUMN "type",
ADD COLUMN     "type" "EventType" NOT NULL DEFAULT 'public',
DROP COLUMN "status",
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'draft';
