import { ClassroomInMemoryRepository } from '@/classroom/infrastructure/database/in-memory/repositories/classroom-in-memory.repository';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { ClassroomDataBuilder } from '@/classroom/domain/testing/helper/classroom-data-builder';
import { ClassroomWithIdNotFoundError } from '@/classroom/infrastructure/errors/classroom-with-id-not-found-error';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { UpdateClassroomUsecase } from '@/classroom/application/usecases/update-classroom.usecase';

describe('Update classroom use case test', () => {
  let sut: UpdateClassroomUsecase.UseCase;
  let repository: ClassroomInMemoryRepository;

  beforeEach(() => {
    repository = new ClassroomInMemoryRepository();
    sut = new UpdateClassroomUsecase.UseCase(repository);
  });

  it.todo('should throw classroomWithIdNotFoundError if classroom does not exist', async () => {});
});
