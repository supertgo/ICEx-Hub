import { faker } from '@faker-js/faker';
import {
  CourseEntity,
  CourseProps,
} from '@/course/domain/entities/course.entity';

export function CourseDataBuilder(props: Partial<CourseProps>) {
  return {
    name: props.name || faker.string.alphanumeric({ length: 10 }),
    code: props.code || faker.string.alphanumeric({ length: 10 }),
    createdAt: props.createdAt || new Date(),
    updatedAt: props.createdAt || new Date(),
  };
}

export function CourseDataBuilderAsEntity(
  props: Partial<CourseProps> = {},
): CourseEntity {
  return new CourseEntity(CourseDataBuilder(props));
}
