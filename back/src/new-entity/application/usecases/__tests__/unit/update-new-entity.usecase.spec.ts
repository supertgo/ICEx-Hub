import { NewEntityInMemoryRepository } from '@/new-entity/infrastructure/database/in-memory/repositories/new-entity-in-memory.repository';
import { NewEntityEntity } from '@/new-entity/domain/entities/new-entity.entity';
import { NewEntityDataBuilder } from '@/new-entity/domain/testing/helper/new-entity-data-builder';
import { NewEntityWithIdNotFoundError } from '@/new-entity/infrastructure/errors/new-entity-with-id-not-found-error';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { UpdateNewEntityUsecase } from '@/new-entity/application/usecases/update-new-entity.usecase';

describe('Update new-entity use case test', () => {
  let sut: UpdateNewEntityUsecase.UseCase;
  let repository: NewEntityInMemoryRepository;

  beforeEach(() => {
    repository = new NewEntityInMemoryRepository();
    sut = new UpdateNewEntityUsecase.UseCase(repository);
  });

  it.todo('should throw new-entityWithIdNotFoundError if new-entity does not exist', async () => {});
});
