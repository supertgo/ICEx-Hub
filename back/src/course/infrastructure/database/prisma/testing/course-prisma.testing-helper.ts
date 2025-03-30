import { Course, PrismaClient } from '@prisma/client';
import { CourseProps } from '@/course/domain/entities/course.entity';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';

export class CoursePrismaTestingHelper {
  static createCourse(
    prisma: PrismaClient,
    props: Partial<CourseProps> = {},
  ): Promise<Course> {
    return prisma.course.create({
      data: CourseDataBuilder(props),
    });
  }
}
