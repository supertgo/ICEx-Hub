import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ListBuildingsUsecase } from '@/building/application/usecases/list-building.usecase';
import { BuildingInMemoryRepository } from '@/building/infrastructure/database/in-memory/repositories/building-in-memory.repository';
import { BuildingRepository } from '@/building/domain/repositories/building.repository';
import { BuildingEntity, BuildingProps } from '@/building/domain/entities/building.entity';
import { BuildingDataBuilder } from '@/building/domain/testing/helper/building-data-builder';

describe('List buildings use cases unit tests', () => {
  function createBuildingEntity(buildingProps: Partial<BuildingProps> = {}) {
    return new BuildingEntity(BuildingDataBuilder(buildingProps));
  }

  let sut: ListBuildingsUsecase.UseCase;
  let repository: BuildingInMemoryRepository;

  beforeEach(() => {
    repository = new BuildingInMemoryRepository();
    sut = new ListBuildingsUsecase.UseCase(repository);
  });

  describe('test to output', () => {
    it('should return empty result in output', () => {
      const result = new BuildingRepository.SearchResult({
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

    it('should return building entity result in output', () => {
      const entity = new BuildingEntity(BuildingDataBuilder({}));
      const result = new BuildingRepository.SearchResult({
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
    const buildings = [
      createBuildingEntity({ createdAt: initialDate }),
      createBuildingEntity({ createdAt: new Date(initialDate.getTime() + 1) }),
      createBuildingEntity({ createdAt: new Date(initialDate.getTime() + 2) }),
    ];
    repository.items = buildings;

    const result = await sut.execute({});

    expect(result.total).toBe(buildings.length);
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

  it('should return buildings filtered, paginated and sorted', async () => {
    const buildings = [
      createBuildingEntity({ name: 'a' }),
      createBuildingEntity({ name: 'A' }),
      createBuildingEntity({ name: 'b' }),
      createBuildingEntity({ name: 'c' }),
    ];
    repository.items = buildings;

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
