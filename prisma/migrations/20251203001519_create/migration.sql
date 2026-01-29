/*
  Warnings:

  - You are about to alter the column `color` on the `Specialty` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - A unique constraint covering the columns `[icon]` on the table `Specialty` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Specialty" ADD COLUMN     "icon" TEXT,
ALTER COLUMN "color" SET DATA TYPE VARCHAR(10);

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_icon_key" ON "Specialty"("icon");
