import { CoursePeriod, PrismaClient } from '@prisma/client';
import { CoursePeriodProps } from '@/course/domain/entities/course-period.entity';
import { CoursePeriodDataBuilder } from '@/user/domain/testing/helper/course-period-data-builder';
import { CoursePrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-prisma.testing-helper';

export class CoursePeriodPrismaTestingHelper {
  static async createCoursePeriod(
    prisma: PrismaClient,
    props: Partial<CoursePeriodProps> = {},
  ): Promise<CoursePeriod> {
    const course = await CoursePrismaTestingHelper.createCourse(prisma);

    return prisma.coursePeriod.create({
      data: {
        ...CoursePeriodDataBuilder(props),
        courseId: course.id,
      },
    });
  }
}
