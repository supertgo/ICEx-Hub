import { DisciplineInMemoryRepository } from '@/discipline/infrastructure/database/in-memory/repositories/discipline-in-memory.repository';
import { GetDisciplineUsecase } from '@/discipline/application/usecases/get-discipline.usecase';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { DeleteDisciplineUsecase } from '@/discipline/application/usecases/delete-discipline.usecase';

describe('Delete discipline use case test', () => {
  let sut: DeleteDisciplineUsecase.UseCase;
  let repository: DisciplineInMemoryRepository;

  beforeEach(() => {
    repository = new DisciplineInMemoryRepository();
    sut = new DeleteDisciplineUsecase.UseCase(repository);
  });

  it('should throw exception if discipline does not exist', async () => {
    const input = { id: 'non-existent-id' };

    await expect(sut.execute(input)).rejects.toThrow(
    );
  });


  it('should call repository delete with correct ID', async () => {
    const discipline = new DisciplineEntity();
    await repository.insert(discipline);

    const spyDelete = jest.spyOn(repository, 'delete');

    const input = { id: discipline.id };

    expect(repository.items).toHaveLength(1)
    await sut.execute(input);

    expect(spyDelete).toHaveBeenCalledWith(discipline.id);

    expect(repository.items).toHaveLength(0)
  });
});
