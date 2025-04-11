import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { courses } from './course.seed';

export let coursePeriods = [];

export const coursePeriodSeed = async (prisma: PrismaClient) => {
  for (const course of courses) {
    const periods = getCoursePeriods(course.id, course.numberOfPeriods);
    coursePeriods = coursePeriods.concat(periods);

    for (const period of periods) {
      await prisma.coursePeriod.upsert({
        where: {
          unique_period_course: {
            courseId: course.id,
            name: period.name,
          },
        },
        update: {
          courseId: course.id,
          id: period.id,
        },
        create: {
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
