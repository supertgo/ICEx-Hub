import { faker } from '@faker-js/faker';
import {
  DisciplineEntity,
  DisciplineProps,
} from '@/discipline/domain/entities/discipline.entity';
import { CourseEntity } from '@/course/domain/entities/course.entity';
import { CoursePeriodDataBuilder } from '@/user/domain/testing/helper/course-period-data-builder';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';

export function DisciplineDataBuilder(props: Partial<DisciplineProps>) {
  const course = props.courseId
    ? { id: props.courseId }
    : CourseDataBuilder({});

  const coursePeriod = props.coursePeriodId
    ? { id: props.coursePeriodId }
    : CoursePeriodDataBuilder({});

  return {
    name: props.name ?? faker.string.alpha(10),
    code: props.code ?? faker.string.alpha(6).toUpperCase(),
    courseId: course.id,
    coursePeriodId: coursePeriod.id,
    createdAt: props.createdAt ?? new Date(),
    updatedAt: props.updatedAt ?? new Date(),
  };
}
export function fakeDisciplineProps(): {
  id: string;
  course: CourseEntity;
  coursePeriodProps: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
} & DisciplineProps {
  const course = new CourseEntity(CourseDataBuilder({ name: 'Course 1' }));
  const coursePeriodProps = CoursePeriodDataBuilder({ name: 'Period 1' });
  const entity = new DisciplineEntity(
    DisciplineDataBuilder({
      courseId: course.name,
      coursePeriodId: coursePeriodProps.name,
    }),
  );

  return {
    id: entity.id,
    course,
    coursePeriodProps,
    name: entity.name,
    code: entity.code,
    courseId: course.id,
    coursePeriodId: coursePeriodProps.id,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}
