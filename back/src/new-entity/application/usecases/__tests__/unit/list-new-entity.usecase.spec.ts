import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ListNewEntitysUsecase } from '@/new-entity/application/usecases/list-new-entity.usecase';
import { NewEntityInMemoryRepository } from '@/new-entity/infrastructure/database/in-memory/repositories/new-entity-in-memory.repository';
import { NewEntityRepository } from '@/new-entity/domain/repositories/new-entity.repository';
import { NewEntityEntity, NewEntityProps } from '@/new-entity/domain/entities/new-entity.entity';
import { NewEntityDataBuilder } from '@/new-entity/domain/testing/helper/new-entity-data-builder';

describe('List new-entitys use cases unit tests', () => {
  function createNewEntityEntity(new-entityProps: Partial<NewEntityProps> = {}) {
    return new NewEntityEntity(NewEntityDataBuilder(new-entityProps));
  }

  let sut: ListNewEntitysUsecase.UseCase;
  let repository: NewEntityInMemoryRepository;

  beforeEach(() => {
    repository = new NewEntityInMemoryRepository();
    sut = new ListNewEntitysUsecase.UseCase(repository);
  });

  describe('test to output', () => {
    it('should return empty result in output', () => {
      const result = new NewEntityRepository.SearchResult({
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

    it('should return new-entity entity result in output', () => {
      const entity = new NewEntityEntity(NewEntityDataBuilder({}));
      const result = new NewEntityRepository.SearchResult({
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
    const new-entitys = [
      createNewEntityEntity({ createdAt: initialDate }),
      createNewEntityEntity({ createdAt: new Date(initialDate.getTime() + 1) }),
      createNewEntityEntity({ createdAt: new Date(initialDate.getTime() + 2) }),
    ];
    repository.items = new-entitys;

    const result = await sut.execute({});

    expect(result.total).toBe(new-entitys.length);
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

  it('should return new-entitys filtered, paginated and sorted', async () => {
    const new-entitys = [
      createNewEntityEntity({ name: 'a' }),
      createNewEntityEntity({ name: 'A' }),
      createNewEntityEntity({ name: 'b' }),
      createNewEntityEntity({ name: 'c' }),
    ];
    repository.items = new-entitys;

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

  it.todo('should return second page when empty in pagination', async () => {
  });

  it.todo('should return items in second page when having them', async () => {
  });

  it.todo('should return empty result when no filter found', async () => {
  });
});
