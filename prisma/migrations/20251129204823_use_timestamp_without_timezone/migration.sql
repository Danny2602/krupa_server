/*
  Warnings:

  - A unique constraint covering the columns `[userId,startTime]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "startTime" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "endTime" SET DATA TYPE TIMESTAMP(6);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_userId_startTime_key" ON "Appointment"("userId", "startTime");
