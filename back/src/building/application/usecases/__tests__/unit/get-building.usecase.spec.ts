import { BuildingInMemoryRepository } from '@/building/infrastructure/database/in-memory/repositories/building-in-memory.repository';
import { GetBuildingUsecase } from '@/building/application/usecases/get-building.usecase';
import { BuildingEntity } from '@/building/domain/entities/building.entity';
import { BuildingDataBuilder } from '@/building/domain/testing/helper/building-data-builder';
import { BuildingWithIdNotFoundError } from '@/building/infrastructure/errors/building-with-id-not-found-error';

describe('Get building use case test', () => {
  let sut: GetBuildingUsecase.UseCase;
  let repository: BuildingInMemoryRepository;

  beforeEach(() => {
    repository = new BuildingInMemoryRepository();
    sut = new GetBuildingUsecase.UseCase(repository);
  });

  it('should throw BuildingWithEmailNotFoundError if building does not exist', async () => {
    const input = { id: 'non-existent-id' };

    await expect(sut.execute(input)).rejects.toThrow(
      new BuildingWithIdNotFoundError(input.id),
    );
  });

  it('should return building details if building exists', async () => {
    const building = new BuildingEntity(BuildingDataBuilder({}));
    await repository.insert(building);

    const input = { id: building.id };

    const result = await sut.execute(input);

    expect(result).toStrictEqual(building.toJSON());
  });

  it('should call repository findById with correct ID', async () => {
    const building = new BuildingEntity(BuildingDataBuilder({}));
    await repository.insert(building);

    const spyFindById = jest.spyOn(repository, 'findById');

    const input = { id: building.id };

    await sut.execute(input);

    expect(spyFindById).toHaveBeenCalledWith(building.id);
  });
});
