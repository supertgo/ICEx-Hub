import { ListDisciplinesUsecase } from '@/discipline/application/usecases/list-discipline.usecase';
import { DisciplineInMemoryRepository } from '@/discipline/infrastructure/database/in-memory/repositories/discipline-in-memory.repository';
import { DisciplineRepository } from '@/discipline/domain/repositories/discipline.repository';
import {
  DisciplineEntity,
  DisciplineProps,
} from '@/discipline/domain/entities/discipline.entity';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';

describe('List disciplines use cases unit tests', () => {
  function createDisciplineEntity(
    disciplineProps: Partial<DisciplineProps> = {},
  ) {
    return new DisciplineEntity(DisciplineDataBuilder(disciplineProps));
  }

  let sut: ListDisciplinesUsecase.UseCase;
  let repository: DisciplineInMemoryRepository;

  beforeEach(() => {
    repository = new DisciplineInMemoryRepository();
    sut = new ListDisciplinesUsecase.UseCase(repository);
  });

  describe('test to output', () => {
    it('should return empty result in output', () => {
      const result = new DisciplineRepository.SearchResult({
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

    it('should return discipline entity result in output', () => {
      const entity = new DisciplineEntity(DisciplineDataBuilder({}));
      const result = new DisciplineRepository.SearchResult({
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
    const disciplines = [
      createDisciplineEntity({ createdAt: initialDate }),
      createDisciplineEntity({
        createdAt: new Date(initialDate.getTime() + 1),
      }),
      createDisciplineEntity({
        createdAt: new Date(initialDate.getTime() + 2),
      }),
    ];
    repository.items = disciplines;

    const result = await sut.execute({});

    expect(result.total).toBe(disciplines.length);
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

  it('should return second page when empty in pagination', async () => {
    const disciplines = [
      createDisciplineEntity({ name: 'a' }),
      createDisciplineEntity({ name: 'b' }),
    ];

    repository.items = disciplines;

    const result = await sut.execute({
      page: 2,
      perPage: 2,
    });

    expect(result.items.length).toBe(0);
    expect(result.total).toBe(2);
    expect(result.currentPage).toBe(2);
    expect(result.lastPage).toBe(1);
    expect(result.perPage).toBe(2);
  });

  it('should return items in second page when having them', async () => {
    const disciplines = [
      createDisciplineEntity({ name: 'a' }),
      createDisciplineEntity({ name: 'b' }),
      createDisciplineEntity({ name: 'c' }),
      createDisciplineEntity({ name: 'd' }),
    ];

    repository.items = disciplines;

    const result = await sut.execute({
      page: 2,
      perPage: 2,
    });

    expect(result.items.length).toBe(2);
    expect(result.total).toBe(4);
    expect(result.currentPage).toBe(2);
    expect(result.lastPage).toBe(2);
    expect(result.perPage).toBe(2);

    expect(result.items[0].name).toBe('c');
    expect(result.items[1].name).toBe('d');
  });

  it('should return empty result when no filter found', async () => {
    const disciplines = [
      createDisciplineEntity({ name: 'a' }),
      createDisciplineEntity({ name: 'b' }),
    ];
    repository.items = disciplines;

    const result = await sut.execute({
      filter: 'z',
    });

    expect(result.items.length).toBe(0);
    expect(result.total).toBe(0);
    expect(result.currentPage).toBe(1);
    expect(result.lastPage).toBe(0);
    expect(result.perPage).toBe(10);
  });
});
