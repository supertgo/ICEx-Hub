import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ListClassroomsUsecase } from '@/classroom/application/usecases/list-classroom.usecase';
import { ClassroomInMemoryRepository } from '@/classroom/infrastructure/database/in-memory/repositories/classroom-in-memory.repository';
import { ClassroomRepository } from '@/classroom/domain/repositories/classroom.repository';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';

describe('List classrooms use cases unit tests', () => {
  let sut: ListClassroomsUsecase.UseCase;
  let repository: ClassroomInMemoryRepository;

  beforeEach(() => {
    repository = new ClassroomInMemoryRepository();
    sut = new ListClassroomsUsecase.UseCase(repository);
  });

  describe('test to output', () => {
    it('should return empty result in output', () => {
      const result = new ClassroomRepository.SearchResult({
        items: [],
        total: 1,
        currentPage: 1,
        perPage: 1,
        sort: null,
        sortDir: null,
        filter: null,
      });

      const output = sut['toOutput'](result);

      expect(output).toStrictEqual({
        items: [],
        total: 1,
        currentPage: 1,
        lastPage: 1,
        perPage: 1,
      });
    });

    it('should return classroom entity result in output', () => {
      const entity = ClassroomEntity.fake().aCADClassroom().build();
      const result = new ClassroomRepository.SearchResult({
        items: [entity],
        total: 1,
        currentPage: 1,
        perPage: 1,
        sort: null,
        sortDir: null,
        filter: null,
      });

      const output = sut['toOutput'](result);

      expect(output).toStrictEqual({
        items: [entity.toJSON()],
        total: 1,
        currentPage: 1,
        lastPage: 1,
        perPage: 1,
      });
    });
  });

  it('should return sorted by created at by default', async () => {
    const initialDate = new Date();
    const classrooms = [
      ClassroomEntity.fake().aCADClassroom().withCreatedAt(initialDate).build(),
      ClassroomEntity.fake()
        .aCADClassroom()
        .withCreatedAt(new Date(initialDate.getTime() + 1))
        .build(),
      ClassroomEntity.fake()
        .aCADClassroom()
        .withCreatedAt(new Date(initialDate.getTime() + 2))
        .build(),
    ];

    repository.items = classrooms;

    const result = await sut.execute({});

    expect(result.total).toBe(classrooms.length);
    expect(result.currentPage).toBe(1);
    expect(result.lastPage).toBe(1);
    expect(result.perPage).toBe(10);

    expect(result.items[0].createdAt.getTime()).toStrictEqual(
      initialDate.getTime() + 2,
    );

    expect(result.items[1].createdAt.getTime()).toStrictEqual(
      initialDate.getTime() + 1,
    );
    expect(result.items[2].createdAt.getTime()).toStrictEqual(
      initialDate.getTime(),
    );
  });

  it('should return classrooms filtered, paginated and sorted', async () => {
    const classrooms = [
      ClassroomEntity.fake().aCADClassroom().withName('a').build(),
      ClassroomEntity.fake().aCADClassroom().withName('A').build(),
      ClassroomEntity.fake().aCADClassroom().withName('b').build(),
      ClassroomEntity.fake().aCADClassroom().withName('B').build(),
    ];

    repository.items = classrooms;

    const result = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: SortOrderEnum.ASC,
      filter: 'a',
    });

    expect(result.total).toBe(2);
    expect(result.currentPage).toBe(1);
    expect(result.lastPage).toBe(1);
    expect(result.perPage).toBe(2);

    expect(result.items[0].name).toBe('A');
    expect(result.items[1].name).toBe('a');
  });

  it.todo('should return second page when empty in pagination');

  it.todo('should return items in second page when having them');

  it.todo('should return empty result when no filter found');
});
