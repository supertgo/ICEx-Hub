import { CoursePeriodInMemoryRepository } from '@/course/infrastructure/database/in-memory/repositories/course-period-in-memory.repository';
import { CoursePeriodDataBuilderAsEntity } from '@/user/domain/testing/helper/course-period-data-builder';

describe('course in memory repository', () => {
  let sut: CoursePeriodInMemoryRepository;

  beforeEach(() => {
    sut = new CoursePeriodInMemoryRepository();
  });

  describe('apply filters method', () => {
    it('should call filter method', async () => {
      const items = Array.from({ length: 3 }, () =>
        CoursePeriodDataBuilderAsEntity(),
      );

      const spyFilter = jest.spyOn(items, 'filter');

      const result = await sut['applyFilters'](items, null);

      expect(result).toStrictEqual(items);
      expect(spyFilter).not.toHaveBeenCalled();
    });
  });
});
