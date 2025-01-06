/*
  Warnings:

  - Added the required column `brochure1` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverPhoto` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "brochure1" TEXT NOT NULL,
ADD COLUMN     "brochure2" TEXT,
ADD COLUMN     "brochure3" TEXT,
ADD COLUMN     "brochure4" TEXT,
ADD COLUMN     "coverPhoto" TEXT NOT NULL;
