import { ClassroomInMemoryRepository } from '@/classroom/infrastructure/database/in-memory/repositories/classroom-in-memory.repository';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

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

  describe('apply sort method', () => {
    it('should return items sorted by name in ascending order', async () => {
      const items = [
        ClassroomEntity.fake().aCADClassroom().withName('211').build(),
        ClassroomEntity.fake().aCADClassroom().withName('311').build(),
        ClassroomEntity.fake().aCADClassroom().withName('411').build(),
        ClassroomEntity.fake().aCADClassroom().withName('413').build(),
      ];

      const result = await sut['applySort'](items, 'name', SortOrderEnum.ASC);

      expect(result[0].props.name).toBe('211');
      expect(result[1].props.name).toBe('311');
      expect(result[2].props.name).toBe('411');
      expect(result[3].props.name).toBe('413');
    });
  });

  it('should return items sorted by name in descending order', async () => {
    const items = [
      ClassroomEntity.fake().aCADClassroom().withName('211').build(),
      ClassroomEntity.fake().aCADClassroom().withName('311').build(),
      ClassroomEntity.fake().aCADClassroom().withName('411').build(),
      ClassroomEntity.fake().aCADClassroom().withName('413').build(),
    ];

    const result = await sut['applySort'](items, 'name', SortOrderEnum.DESC);

    expect(result[0].props.name).toBe('413');
    expect(result[1].props.name).toBe('411');
    expect(result[2].props.name).toBe('311');
    expect(result[3].props.name).toBe('211');
  });

  it('should return items sorted by createdAt in ascending order', async () => {
    const createdAt = new Date();
    const items = [
      ClassroomEntity.fake().aCADClassroom().withCreatedAt(createdAt).build(),
      ClassroomEntity.fake()
        .aCADClassroom()
        .withCreatedAt(new Date(createdAt.getTime() + 1))
        .build(),
      ClassroomEntity.fake()
        .aCADClassroom()
        .withCreatedAt(new Date(createdAt.getTime() + 2))
        .build(),
    ];

    const result = await sut['applySort'](
      items,
      'createdAt',
      SortOrderEnum.ASC,
    );

    expect(result[0].props.name).toStrictEqual(items[0].name);
    expect(result[1].props.name).toStrictEqual(items[1].name);
    expect(result[2].props.name).toStrictEqual(items[2].name);
  });

  it('should return items sorted by createdAt in descending order', async () => {
    const createdAt = new Date();
    const items = [
      ClassroomEntity.fake().aCADClassroom().withCreatedAt(createdAt).build(),
      ClassroomEntity.fake()
        .aCADClassroom()
        .withCreatedAt(new Date(createdAt.getTime() + 1))
        .build(),
      ClassroomEntity.fake()
        .aCADClassroom()
        .withCreatedAt(new Date(createdAt.getTime() + 2))
        .build(),
    ];

    const result = await sut['applySort'](
      items,
      'createdAt',
      SortOrderEnum.DESC,
    );

    expect(result[0].props.name).toStrictEqual(items[2].name);
    expect(result[1].props.name).toStrictEqual(items[1].name);
    expect(result[2].props.name).toStrictEqual(items[0].name);
  });
});
