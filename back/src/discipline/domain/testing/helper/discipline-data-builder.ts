import { faker } from '@faker-js/faker';

export type DisciplineProps = {
  name: string;
  code: string;
  courseId: string;
  coursePeriodId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

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
