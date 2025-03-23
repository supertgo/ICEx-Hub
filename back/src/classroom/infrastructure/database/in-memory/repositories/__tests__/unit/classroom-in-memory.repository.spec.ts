import { ClassroomInMemoryRepository } from '@/classroom/infrastructure/database/in-memory/repositories/classroom-in-memory.repository';
import { ClassroomWithEmailNotFoundError } from '@/classroom/domain/errors/classroom-with-email-not-found-error';
import { faker } from '@faker-js/faker';
import { ClassroomDataBuilder } from '@/classroom/domain/testing/helper/classroom-data-builder';
import { ClassroomEntity, ClassroomProps } from '@/classroom/domain/entities/classroom.entity';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

function createClassroomEntity(classroomProps: Partial<ClassroomProps> = {}) {
  return new ClassroomEntity(ClassroomDataBuilder(classroomProps));
}

describe('classroom in memory repository', () => {
  let sut: ClassroomInMemoryRepository;

  beforeEach(() => {
    sut = new ClassroomInMemoryRepository();
  });

  describe('apply filters method', () => {
    it('should return item with null filter', async () => {
      const items = Array.from({ length: 3 }, () => createClassroomEntity());

      const spyFilter = jest.spyOn(items, 'filter');

      const result = await sut['applyFilters'](items, null);

      expect(result).toStrictEqual(items);
      expect(spyFilter).not.toHaveBeenCalled();
    });

  });

  describe('apply sort method', () => { });
});
