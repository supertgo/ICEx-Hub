import { ClassroomInMemoryRepository } from '@/classroom/infrastructure/database/in-memory/repositories/classroom-in-memory.repository';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';

describe('classroom in memory repository', () => {
  let sut: ClassroomInMemoryRepository;

  beforeEach(() => {
    sut = new ClassroomInMemoryRepository();
  });

  describe('apply filters method', () => {
    it('should return item with null filter', async () => {
      const items = ClassroomEntity.fake().theCadClassrooms(3).build();

      const spyFilter = jest.spyOn(items, 'filter');

      const result = await sut['applyFilters'](items, null);

      expect(result).toStrictEqual(items);
      expect(spyFilter).not.toHaveBeenCalled();
    });
  });

  describe('apply sort method', () => {});
});
