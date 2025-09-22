import { NewEntityInMemoryRepository } from '@/new-entity/infrastructure/database/in-memory/repositories/new-entity-in-memory.repository';
import { NewEntityWithEmailNotFoundError } from '@/new-entity/domain/errors/new-entity-with-email-not-found-error';
import { faker } from '@faker-js/faker';
import { NewEntityDataBuilder } from '@/new-entity/domain/testing/helper/new-entity-data-builder';
import { NewEntityEntity, NewEntityProps } from '@/new-entity/domain/entities/new-entity.entity';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

function createNewEntityEntity(new-entityProps: Partial<NewEntityProps> = {}) {
  return new NewEntityEntity(NewEntityDataBuilder(new-entityProps));
}

describe('new-entity in memory repository', () => {
  let sut: NewEntityInMemoryRepository;

  beforeEach(() => {
    sut = new NewEntityInMemoryRepository();
  });

  describe('apply filters method', () => {
    it('should return item with null filter', async () => {
      const items = Array.from({ length: 3 }, () => createNewEntityEntity());

      const spyFilter = jest.spyOn(items, 'filter');

      const result = await sut['applyFilters'](items, null);

      expect(result).toStrictEqual(items);
      expect(spyFilter).not.toHaveBeenCalled();
    });

  });

  describe('apply sort method', () => { });
});
