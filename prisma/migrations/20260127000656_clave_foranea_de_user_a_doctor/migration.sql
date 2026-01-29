/*
  Warnings:

  - A unique constraint covering the columns `[UserId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "UserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_UserId_key" ON "Doctor"("UserId");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
