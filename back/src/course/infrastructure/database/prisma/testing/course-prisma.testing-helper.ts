import { Course, CoursePeriod, PrismaClient } from '@prisma/client';
import {
  CourseEntity,
  CourseProps,
} from '@/course/domain/entities/course.entity';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';
import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';
import { sanitizeString } from '@/shared/domain/helper/sanitize-string.helper';

export class CoursePrismaTestingHelper {
  static createCourse(
    prisma: PrismaClient,
    props: Partial<CourseProps> = {},
  ): Promise<Course> {
    const course = CourseDataBuilder(props);

    return prisma.course.create({
      data: {
        ...course,
        sanitized_name: sanitizeString(course.name),
      },
    });
  }

  static createSanitizedCourses(
    prisma: PrismaClient,
    entities: CourseEntity[],
  ) {
    return prisma.course.createMany({
      data: entities.map((course) => ({
        ...course.toJSON(),
        sanitized_name: sanitizeString(course.name),
      })),
    });
  }

  static async createSanitizedCourse(
    prisma: PrismaClient,
    course: CourseEntity,
  ): Promise<Course> {
    return prisma.course.create({
      data: {
        ...course.toJSON(),
        sanitized_name: sanitizeString(course.name),
      },
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
