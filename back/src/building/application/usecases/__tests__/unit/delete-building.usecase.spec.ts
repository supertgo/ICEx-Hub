import { BuildingInMemoryRepository } from '@/building/infrastructure/database/in-memory/repositories/building-in-memory.repository';
import { GetBuildingUsecase } from '@/building/application/usecases/get-building.usecase';
import { BuildingEntity } from '@/building/domain/entities/building.entity';
import { DeleteBuildingUsecase } from '@/building/application/usecases/delete-building.usecase';

describe('Delete building use case test', () => {
  let sut: DeleteBuildingUsecase.UseCase;
  let repository: BuildingInMemoryRepository;

  beforeEach(() => {
    repository = new BuildingInMemoryRepository();
    sut = new DeleteBuildingUsecase.UseCase(repository);
  });

  it('should throw exception if building does not exist', async () => {
    const input = { id: 'non-existent-id' };

    await expect(sut.execute(input)).rejects.toThrow(
    );
  });


  it('should call repository delete with correct ID', async () => {
    const building = new BuildingEntity();
    await repository.insert(building);

    const spyDelete = jest.spyOn(repository, 'delete');

    const input = { id: building.id };

    expect(repository.items).toHaveLength(1)
    await sut.execute(input);

    expect(spyDelete).toHaveBeenCalledWith(building.id);

    expect(repository.items).toHaveLength(0)
  });
});
