/*
  Warnings:

  - You are about to drop the column `amount` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `price` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "brochure1" DROP NOT NULL,
ALTER COLUMN "coverPhoto" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "amount",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
