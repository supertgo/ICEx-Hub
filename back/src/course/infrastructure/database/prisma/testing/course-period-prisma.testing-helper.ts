import { CoursePeriod, PrismaClient } from '@prisma/client';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';
import { CoursePeriodProps } from '@/course/domain/entities/course-period.entity';
import { CoursePeriodDataBuilder } from '@/user/domain/testing/helper/course-period-data-builder';

export class CoursePeriodPrismaTestingHelper {
  static async createCoursePeriod(
    prisma: PrismaClient,
    props: Partial<CoursePeriodProps> = {},
  ): Promise<CoursePeriod> {
    const course = await prisma.course.create({
      data: CourseDataBuilder(props),
    });

    return prisma.coursePeriod.create({
      data: {
        ...CoursePeriodDataBuilder(props),
        courseId: course.id,
      },
    });
  }
}
