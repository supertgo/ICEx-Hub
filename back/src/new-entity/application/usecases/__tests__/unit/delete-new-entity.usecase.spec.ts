import { NewEntityInMemoryRepository } from '@/new-entity/infrastructure/database/in-memory/repositories/new-entity-in-memory.repository';
import { GetNewEntityUsecase } from '@/new-entity/application/usecases/get-new-entity.usecase';
import { NewEntityEntity } from '@/new-entity/domain/entities/new-entity.entity';
import { DeleteNewEntityUsecase } from '@/new-entity/application/usecases/delete-new-entity.usecase';

describe('Delete new-entity use case test', () => {
  let sut: DeleteNewEntityUsecase.UseCase;
  let repository: NewEntityInMemoryRepository;

  beforeEach(() => {
    repository = new NewEntityInMemoryRepository();
    sut = new DeleteNewEntityUsecase.UseCase(repository);
  });

  it('should throw exception if new-entity does not exist', async () => {
    const input = { id: 'non-existent-id' };

    await expect(sut.execute(input)).rejects.toThrow(
    );
  });


  it('should call repository delete with correct ID', async () => {
    const new_entity = new NewEntityEntity();
    await repository.insert(new_entity);

    const spyDelete = jest.spyOn(repository, 'delete');

    const input = { id: new_entity.id };

    expect(repository.items).toHaveLength(1)
    await sut.execute(input);

    expect(spyDelete).toHaveBeenCalledWith(new_entity.id);

    expect(repository.items).toHaveLength(0)
  });
});
