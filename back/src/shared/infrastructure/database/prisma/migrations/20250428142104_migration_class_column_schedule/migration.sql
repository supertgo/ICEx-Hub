/*
  Warnings:

  - Made the column `class` on table `schedules` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "schedules" ALTER COLUMN "class" SET NOT NULL;
