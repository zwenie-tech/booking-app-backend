/*
  Warnings:

  - You are about to drop the column `brochure1` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `brochure2` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `brochure3` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `brochure4` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Event` table. All the data in the column will be lost.
  - Added the required column `color` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `coverPhoto` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "color" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "brochure1",
DROP COLUMN "brochure2",
DROP COLUMN "brochure3",
DROP COLUMN "brochure4",
DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ALTER COLUMN "subCategory" DROP NOT NULL,
ALTER COLUMN "coverPhoto" SET NOT NULL;

-- CreateTable
CREATE TABLE "EventGallery" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventGallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventGallery" ADD CONSTRAINT "EventGallery_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
