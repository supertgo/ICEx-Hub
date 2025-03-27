import { faker } from '@faker-js/faker';
import { CourseProps } from '@/course/domain/entities/course.entity';

export function CourseDataBuilder(props: Partial<CourseProps>) {
  return {
    name: props.name || faker.string.alphanumeric(),
    code: props.name || faker.string.alphanumeric(),
  };
}
