import { DisciplineInMemoryRepository } from '@/discipline/infrastructure/database/in-memory/repositories/discipline-in-memory.repository';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { DeleteDisciplineUsecase } from '@/discipline/application/usecases/delete-discipline.usecase';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';

describe('Delete discipline use case test', () => {
  let sut: DeleteDisciplineUsecase.UseCase;
  let repository: DisciplineInMemoryRepository;

  beforeEach(() => {
    repository = new DisciplineInMemoryRepository();
    sut = new DeleteDisciplineUsecase.UseCase(repository);
  });

  it('should throw exception if discipline does not exist', async () => {
    const id = 'non-existent-id';
    const input = { id };

    await expect(sut.execute(input)).rejects.toThrow(
      new DisciplineWithIdNotFoundError(id),
    );
  });

  it('should call repository delete with correct ID', async () => {
    const discipline = new DisciplineEntity(DisciplineDataBuilder({}));
    await repository.insert(discipline);

    const spyDelete = jest.spyOn(repository, 'delete');

    const input = { id: discipline.id };

    expect(repository.items).toHaveLength(1);
    await sut.execute(input);

    expect(spyDelete).toHaveBeenCalledWith(discipline.id);

    expect(repository.items).toHaveLength(0);
  });
});
