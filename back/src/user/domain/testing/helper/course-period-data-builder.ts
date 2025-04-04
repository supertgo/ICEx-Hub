import { faker } from '@faker-js/faker';
import { CourseProps } from '@/course/domain/entities/course.entity';
import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';

export function CoursePeriodDataBuilder(props: Partial<CourseProps>) {
  return {
    name: props.name || faker.string.alphanumeric(),
    createdAt: props.createdAt || new Date(),
    updatedAt: props.createdAt || new Date(),
  };
}

export function CoursePeriodDataBuilderAsEntity(
  props: Partial<CourseProps> = {},
): CoursePeriodEntity {
  return new CoursePeriodEntity(CoursePeriodDataBuilder(props));
}
