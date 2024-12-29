-- CreateTable
CREATE TABLE "Organizer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "website" TEXT,
    "logo" TEXT,
    "about" TEXT NOT NULL,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Host" ADD CONSTRAINT "Host_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Organizer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
