/*
  Warnings:

  - A unique constraint covering the columns `[classroomId,dayPattern,timeSlot,class]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "schedules_classroomId_dayPattern_timeSlot_key";

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "class" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "schedules_classroomId_dayPattern_timeSlot_class_key" ON "schedules"("classroomId", "dayPattern", "timeSlot", "class");
