import { DisciplineInMemoryRepository } from '@/discipline/infrastructure/database/in-memory/repositories/discipline-in-memory.repository';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';
import { UpdateDisciplineUsecase } from '@/discipline/application/usecases/update-discipline.usecase';

describe('Update discipline use case test', () => {
  let sut: UpdateDisciplineUsecase.UseCase;
  let repository: DisciplineInMemoryRepository;

  beforeEach(() => {
    repository = new DisciplineInMemoryRepository();
    sut = new UpdateDisciplineUsecase.UseCase(repository);
  });

  it('should throw disciplineWithIdNotFoundError if discipline does not exist', async () => {
    const input = { id: 'invalid-id', name: 'Updated Name' };

    await expect(sut.execute(input)).rejects.toThrow(
      new DisciplineWithIdNotFoundError(input.id),
    );
  });

  it('should update a discipline successfully', async () => {
    const discipline = new DisciplineEntity(
      DisciplineDataBuilder({ name: 'Old Name' }),
    );
    await repository.insert(discipline);

    const input = {
      id: discipline.id,
      name: 'Updated Name',
      code: 'UPDATED123',
    };

    const result = await sut.execute(input);

    expect(result).toBeDefined();
    expect(result.id).toBe(discipline.id);
    expect(result.name).toBe('Updated Name');
    expect(result.code).toBe('UPDATED123');

    const updatedDiscipline = await repository.findById(discipline.id);
    expect(updatedDiscipline).toBeDefined();
    expect(updatedDiscipline?.name).toBe('Updated Name');
    expect(updatedDiscipline?.code).toBe('UPDATED123');
  });
});
