/*
  Warnings:

  - Added the required column `expiresAt` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `RefreshTokenHost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "RefreshTokenHost" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
