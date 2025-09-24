import { BuildingEntity, BuildingProps } from '@/building/domain/entities/building.entity';
import { BuildingDataBuilder } from '@/building/domain/testing/helper/building-data-builder';

function commonAssertions(sut: BuildingEntity, props: BuildingProps) { }

describe('Building entity unit tests', () => {
  let sut: BuildingEntity;

  beforeEach(() => {
    BuildingEntity.validate = jest.fn();
  })
});
