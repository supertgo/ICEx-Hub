import { CourseInMemoryRepository } from '@/course/infrastructure/database/in-memory/repositories/course-in-memory.repository';
import {
  CourseEntity,
  CourseProps,
} from '@/course/domain/entities/course.entity';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';

function createCourseEntity(courseProps: Partial<CourseProps> = {}) {
  return new CourseEntity(CourseDataBuilder(courseProps));
}

describe('course in memory repository', () => {
  let sut: CourseInMemoryRepository;

  beforeEach(() => {
    sut = new CourseInMemoryRepository();
  });

  describe('apply filters method', () => {
    it('should return item with null filter', async () => {
      const items = Array.from({ length: 3 }, () => createCourseEntity());

      const spyFilter = jest.spyOn(items, 'filter');

      const result = await sut['applyFilters'](items, null);

      expect(result).toStrictEqual(items);
      expect(spyFilter).not.toHaveBeenCalled();
    });
  });

  describe('apply sort method', () => {});
});
