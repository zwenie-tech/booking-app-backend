-- DropEnum
DROP TYPE "EventMode";

-- DropEnum
DROP TYPE "EventStatus";

-- CreateTable
CREATE TABLE "EventStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EventStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventMode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EventMode_pkey" PRIMARY KEY ("id")
);
