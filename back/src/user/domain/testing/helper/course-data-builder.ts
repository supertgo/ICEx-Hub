import { faker } from '@faker-js/faker';
import {
  CourseEntity,
  CourseProps,
} from '@/course/domain/entities/course.entity';

export function CourseDataBuilder(props: Partial<CourseProps>) {
  return {
    name: props.name || faker.string.alphanumeric(),
    code: props.name || faker.string.alphanumeric(),
    createdAt: props.createdAt || new Date(),
    updatedAt: props.createdAt || new Date(),
  };
}

export function CourseDataBuilderAsEntity(
  props: Partial<CourseProps> = {},
): CourseEntity {
  return new CourseEntity(CourseDataBuilder(props));
}
