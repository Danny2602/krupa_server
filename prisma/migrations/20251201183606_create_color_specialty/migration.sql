/*
  Warnings:

  - A unique constraint covering the columns `[color]` on the table `Specialty` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Specialty" ADD COLUMN     "color" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_color_key" ON "Specialty"("color");
