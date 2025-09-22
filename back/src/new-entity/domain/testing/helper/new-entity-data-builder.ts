import { faker } from '@faker-js/faker';
import { NewEntityProps } from '@/new-entity/domain/entities/new-entity.entity';

export function NewEntityDataBuilder(props: Partial<NewEntityProps>) {
  return {
    name: props.name || faker.string.alphanumeric(),
    createdAt: props.createdAt || new Date(),
    updatedAt: props.createdAt || new Date(),
  };
}
