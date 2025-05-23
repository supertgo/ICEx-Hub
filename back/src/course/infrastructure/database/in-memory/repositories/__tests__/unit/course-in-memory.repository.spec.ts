import { CourseInMemoryRepository } from '@/course/infrastructure/database/in-memory/repositories/course-in-memory.repository';
import { CourseDataBuilderAsEntity } from '@/user/domain/testing/helper/course-data-builder';

describe('course in memory repository', () => {
  let sut: CourseInMemoryRepository;

  beforeEach(() => {
    sut = new CourseInMemoryRepository();
  });

  describe('apply filters method', () => {
    it('should call filter method', async () => {
      const items = Array.from({ length: 3 }, () =>
        CourseDataBuilderAsEntity(),
      );

      const spyFilter = jest.spyOn(items, 'filter');

      const result = await sut['applyFilters'](items, null);

      expect(result).toStrictEqual(items);
      expect(spyFilter).not.toHaveBeenCalled();
    });
  });
});
