import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { courses } from './course.seed';

export const coursePeriodSeed = async (prisma: PrismaClient) => {
  for (const course of courses) {
    const periods = getCoursePeriods(course.id, course.numberOfPeriods);
    for (const period of periods) {
      await prisma.coursePeriod.create({
        data: {
          name: period.name,
          id: period.id,
          courseId: course.id,
        },
      });
    }
  }
};

function getCoursePeriods(courseId: string, n: number) {
  return Array.from({ length: n }, (_, i) => ({
    name: `${i + 1}º período`,
    courseId: courseId,
    id: faker.string.uuid(),
  }));
}
