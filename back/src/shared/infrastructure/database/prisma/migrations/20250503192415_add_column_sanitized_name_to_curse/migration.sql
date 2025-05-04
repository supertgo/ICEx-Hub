/*
  Warnings:

  - Added the required column `sanitized_name` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses"
    ADD COLUMN "sanitized_name" VARCHAR(100) NOT NULL;
