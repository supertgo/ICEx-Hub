import { BuildingInMemoryRepository } from '@/building/infrastructure/database/in-memory/repositories/building-in-memory.repository';
import { BuildingEntity } from '@/building/domain/entities/building.entity';
import { BuildingDataBuilder } from '@/building/domain/testing/helper/building-data-builder';
import { BuildingWithIdNotFoundError } from '@/building/infrastructure/errors/building-with-id-not-found-error';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { UpdateBuildingUsecase } from '@/building/application/usecases/update-building.usecase';

describe('Update building use case test', () => {
  let sut: UpdateBuildingUsecase.UseCase;
  let repository: BuildingInMemoryRepository;

  beforeEach(() => {
    repository = new BuildingInMemoryRepository();
    sut = new UpdateBuildingUsecase.UseCase(repository);
  });

  it.todo('should throw buildingWithIdNotFoundError if building does not exist', async () => {});
});
