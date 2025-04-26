import { DisciplineInMemoryRepository } from '@/discipline/infrastructure/database/in-memory/repositories/discipline-in-memory.repository';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { UpdateDisciplineUsecase } from '@/discipline/application/usecases/update-discipline.usecase';

describe('Update discipline use case test', () => {
  let sut: UpdateDisciplineUsecase.UseCase;
  let repository: DisciplineInMemoryRepository;

  beforeEach(() => {
    repository = new DisciplineInMemoryRepository();
    sut = new UpdateDisciplineUsecase.UseCase(repository);
  });

  it.todo('should throw disciplineWithIdNotFoundError if discipline does not exist', async () => {});
});
