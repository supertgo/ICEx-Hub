import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { courses } from './course.seed';

export let coursePeriods = [];

export const coursePeriodSeed = async (prisma: PrismaClient) => {
  for (const course of courses) {
    const courseRecord = await prisma.course.findUnique({
      where: {
        code: course.code,
      },
    });

    const periods = getCoursePeriods(courseRecord.id, course.numberOfPeriods);
    coursePeriods = coursePeriods.concat(periods);

    for (const period of periods) {
      await prisma.coursePeriod.upsert({
        where: {
          unique_period_course: {
            courseId: courseRecord.id,
            name: period.name,
          },
        },
        update: {},
        create: {
          name: period.name,
          id: period.id,
          courseId: courseRecord.id,
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
