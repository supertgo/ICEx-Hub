/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coursePeriodId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "courseId" UUID NOT NULL,
ADD COLUMN     "coursePeriodId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_coursePeriodId_fkey" FOREIGN KEY ("coursePeriodId") REFERENCES "course_periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
