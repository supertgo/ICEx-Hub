import { UserProps } from '@/user/domain/entities/user.entity';
import { faker } from '@faker-js/faker';

export function UserDataBuilder(props: Partial<UserProps>) {
  return {
    name: props.name || faker.person.fullName(),
    email: props.email || faker.internet.email(),
    password: props.password || faker.internet.password(),
    createdAt: props.createdAt || new Date(),
  };
}

export function UserDataBuilderWithOptionalIds(props: Partial<UserProps>) {
  return {
    name: props.name || faker.person.fullName(),
    email: props.email || faker.internet.email(),
    password: props.password || faker.internet.password(),
    createdAt: props.createdAt || new Date(),
    courseId: props.courseId || faker.string.uuid(),
    coursePeriodId: props.coursePeriodId || faker.string.uuid(),
  };
}
