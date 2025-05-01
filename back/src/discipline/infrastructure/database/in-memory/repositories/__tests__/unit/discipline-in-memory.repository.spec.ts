import { DisciplineInMemoryRepository } from '@/discipline/infrastructure/database/in-memory/repositories/discipline-in-memory.repository';
import { DisciplineWithEmailNotFoundError } from '@/discipline/domain/errors/discipline-with-email-not-found-error';
import { faker } from '@faker-js/faker';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { DisciplineEntity, DisciplineProps } from '@/discipline/domain/entities/discipline.entity';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

function createDisciplineEntity(disciplineProps: Partial<DisciplineProps> = {}) {
  return new DisciplineEntity(DisciplineDataBuilder(disciplineProps));
}

describe('discipline in memory repository', () => {
  let sut: DisciplineInMemoryRepository;

  beforeEach(() => {
    sut = new DisciplineInMemoryRepository();
  });

  describe('apply filters method', () => {
    it('should return item with null filter', async () => {
      const items = Array.from({ length: 3 }, () => createDisciplineEntity());

      const spyFilter = jest.spyOn(items, 'filter');

      const result = await sut['applyFilters'](items, null);

      expect(result).toStrictEqual(items);
      expect(spyFilter).not.toHaveBeenCalled();
    });

  });

  describe('apply sort method', () => { });
});
