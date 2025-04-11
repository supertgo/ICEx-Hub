import { Course, CoursePeriod, PrismaClient } from '@prisma/client';
import { CourseProps } from '@/course/domain/entities/course.entity';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';
import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';

export class CoursePrismaTestingHelper {
  static createCourse(
    prisma: PrismaClient,
    props: Partial<CourseProps> = {},
  ): Promise<Course> {
    return prisma.course.create({
      data: CourseDataBuilder(props),
    });
  }

  static async createCoursePeriods(
    prisma: PrismaClient,
    count: number = 1,
    overrides?: Partial<CoursePeriod>,
  ) {
    const course = await CoursePrismaTestingHelper.createCourse(prisma);
    const entities = CoursePeriodEntity.fake()
      .theCoursePeriods(count)
      .withCourseId(course.id)
      .build();

    return prisma.coursePeriod.createMany({
      data: entities.map((entity) => ({
        ...entity.toJSON(),
        ...overrides,
      })),
    });
  }
}
