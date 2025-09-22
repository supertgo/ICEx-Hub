import { BuildingInMemoryRepository } from '@/building/infrastructure/database/in-memory/repositories/building-in-memory.repository';
import { BuildingWithEmailNotFoundError } from '@/building/domain/errors/building-with-email-not-found-error';
import { faker } from '@faker-js/faker';
import { BuildingDataBuilder } from '@/building/domain/testing/helper/building-data-builder';
import { BuildingEntity, BuildingProps } from '@/building/domain/entities/building.entity';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

function createBuildingEntity(buildingProps: Partial<BuildingProps> = {}) {
  return new BuildingEntity(BuildingDataBuilder(buildingProps));
}

describe('building in memory repository', () => {
  let sut: BuildingInMemoryRepository;

  beforeEach(() => {
    sut = new BuildingInMemoryRepository();
  });

  describe('apply filters method', () => {
    it('should return item with null filter', async () => {
      const items = Array.from({ length: 3 }, () => createBuildingEntity());

      const spyFilter = jest.spyOn(items, 'filter');

      const result = await sut['applyFilters'](items, null);

      expect(result).toStrictEqual(items);
      expect(spyFilter).not.toHaveBeenCalled();
    });

  });

  describe('apply sort method', () => { });
});
