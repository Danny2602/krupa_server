/*
  Warnings:

  - A unique constraint covering the columns `[userId,startTime]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Appointment_doctorId_startTime_key";

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_userId_startTime_key" ON "Appointment"("userId", "startTime");
