import { faker } from '@faker-js/faker';
import {
  DisciplineEntity,
  DisciplineProps,
} from '@/discipline/domain/entities/discipline.entity';

export function DisciplineDataBuilder(props: Partial<DisciplineProps>) {
  return {
    name: props.name ?? faker.string.alpha(10),
    code: props.code ?? faker.string.alpha(6).toUpperCase(),
    courseId: props.courseId || faker.string.uuid(),
    coursePeriodId: props.coursePeriodId || faker.string.uuid(),
    createdAt: props.createdAt ?? new Date(),
    updatedAt: props.updatedAt ?? new Date(),
  };
}

export function DisciplineDataBuilderAsEntity(
  props: Partial<DisciplineProps> = {},
): DisciplineEntity {
  return new DisciplineEntity(DisciplineDataBuilder(props));
}
