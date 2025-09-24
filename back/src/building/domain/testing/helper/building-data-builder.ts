import { faker } from '@faker-js/faker';
import { BuildingProps } from '@/building/domain/entities/building.entity';

export function BuildingDataBuilder(props: Partial<BuildingProps>) {
  return {
    name: props.name || faker.string.alphanumeric(),
    createdAt: props.createdAt || new Date(),
    updatedAt: props.createdAt || new Date(),
  };
}
