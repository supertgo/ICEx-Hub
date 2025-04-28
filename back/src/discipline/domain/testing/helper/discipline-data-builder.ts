import { faker } from '@faker-js/faker';
import {
  DisciplineEntity,
  DisciplineProps,
} from '@/discipline/domain/entities/discipline.entity';
import { CourseEntity } from '@/course/domain/entities/course.entity';
import { CoursePeriodDataBuilder } from '@/user/domain/testing/helper/course-period-data-builder';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';

export function DisciplineDataBuilder(props: Partial<DisciplineProps>) {
  return {
    name: props.name ?? faker.person.jobTitle(),
    code:
      props.code ??
      faker.string
        .alphanumeric({
          length: 6,
        })
        .toUpperCase(),
    courseId: props.courseId ?? faker.string.uuid(),
    coursePeriodId: props.coursePeriodId ?? faker.string.uuid(),
    createdAt: props.createdAt ?? faker.date.recent(),
    updatedAt: props.updatedAt ?? faker.date.recent(),
  };
}

export function fakeDisciplineProps(): {
  id: string;
  course: CourseEntity;
  coursePeriodProps: {
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
} & DisciplineProps {
  const course = new CourseEntity(CourseDataBuilder({}));
  const coursePeriodProps = CoursePeriodDataBuilder({});
  const entity = new DisciplineEntity(DisciplineDataBuilder({}));

  return {
    id: entity.id,
    course,
    coursePeriodProps,
    name: entity.name,
    code: entity.code,
    courseId: course.id,
    coursePeriodId: faker.string.uuid(),
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}
