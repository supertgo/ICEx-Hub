import { DisciplineInMemoryRepository } from '@/discipline/infrastructure/database/in-memory/repositories/discipline-in-memory.repository';
import { GetDisciplineUsecase } from '@/discipline/application/usecases/get-discipline.usecase';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';

describe('Get discipline use case test', () => {
  let sut: GetDisciplineUsecase.UseCase;
  let repository: DisciplineInMemoryRepository;

  beforeEach(() => {
    repository = new DisciplineInMemoryRepository();
    sut = new GetDisciplineUsecase.UseCase(repository);
  });

  it('should throw DisciplineWithIdNotFoundError if discipline does not exist', async () => {
    const input = { id: 'non-existent-id' };

    await expect(sut.execute(input)).rejects.toThrow(
      new DisciplineWithIdNotFoundError(input.id),
    );
  });

  it('should return discipline details if discipline exists', async () => {
    const discipline = new DisciplineEntity(DisciplineDataBuilder({}));
    await repository.insert(discipline);

    const input = { id: discipline.id };

    const result = await sut.execute(input);

    expect(result).toStrictEqual(discipline.toJSON());
  });

  it('should call repository findById with correct ID', async () => {
    const discipline = new DisciplineEntity(DisciplineDataBuilder({}));
    await repository.insert(discipline);

    const spyFindById = jest.spyOn(repository, 'findById');

    const input = { id: discipline.id };

    await sut.execute(input);

    expect(spyFindById).toHaveBeenCalledWith(discipline.id);
  });
});
