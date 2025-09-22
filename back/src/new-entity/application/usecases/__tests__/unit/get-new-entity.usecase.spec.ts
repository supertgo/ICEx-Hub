import { NewEntityInMemoryRepository } from '@/new-entity/infrastructure/database/in-memory/repositories/new-entity-in-memory.repository';
import { GetNewEntityUsecase } from '@/new-entity/application/usecases/get-new-entity.usecase';
import { NewEntityEntity } from '@/new-entity/domain/entities/new-entity.entity';
import { NewEntityDataBuilder } from '@/new-entity/domain/testing/helper/new-entity-data-builder';
import { NewEntityWithIdNotFoundError } from '@/new-entity/infrastructure/errors/new-entity-with-id-not-found-error';

describe('Get new-entity use case test', () => {
  let sut: GetNewEntityUsecase.UseCase;
  let repository: NewEntityInMemoryRepository;

  beforeEach(() => {
    repository = new NewEntityInMemoryRepository();
    sut = new GetNewEntityUsecase.UseCase(repository);
  });

  it('should throw NewEntityWithEmailNotFoundError if new-entity does not exist', async () => {
    const input = { id: 'non-existent-id' };

    await expect(sut.execute(input)).rejects.toThrow(
      new NewEntityWithIdNotFoundError(input.id),
    );
  });

  it('should return new-entity details if new-entity exists', async () => {
    const new-entity = new NewEntityEntity(NewEntityDataBuilder({}));
    await repository.insert(new-entity);

    const input = { id: new-entity.id };

    const result = await sut.execute(input);

    expect(result).toStrictEqual(new-entity.toJSON());
  });

  it('should call repository findById with correct ID', async () => {
    const new_entity = new NewEntityEntity(NewEntityDataBuilder({}));
    await repository.insert(new-entity);

    const spyFindById = jest.spyOn(repository, 'findById');

    const input = { id: new_entity.id };

    await sut.execute(input);

    expect(spyFindById).toHaveBeenCalledWith(new_entity.id);
  });
});
