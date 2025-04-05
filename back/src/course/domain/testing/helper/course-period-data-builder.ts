import { faker } from '@faker-js/faker';
import { CourseProps } from '../../entities/course.entity';

export function CoursePeriodDataBuilder(props: Partial<CourseProps>) {
  return {
    name: props.name || faker.string.alphanumeric(),
    createdAt: props.createdAt || new Date(),
    updatedAt: props.createdAt || new Date(),
  };
}
