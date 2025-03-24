import { ClassroomInMemoryRepository } from '@/classroom/infrastructure/database/in-memory/repositories/classroom-in-memory.repository';
import { UpdateClassroomUsecase } from '@/classroom/application/usecases/update-classroom.usecase';
import { ClassroomWithIdNotFoundError } from '@/classroom/infrastructure/errors/classroom-with-id-not-found';

describe('Update classroom use case test', () => {
  let sut: UpdateClassroomUsecase.UseCase;
  let repository: ClassroomInMemoryRepository;

  beforeEach(() => {
    repository = new ClassroomInMemoryRepository();
    sut = new UpdateClassroomUsecase.UseCase(repository);
  });

  it('should throw ClassroomWithIdNotFoundError if classroom does not exist', async () => {
    const input = { id: 'invalid-id' };

    await expect(sut.execute(input)).rejects.toThrow(
      new ClassroomWithIdNotFoundError(input.id),
    );
  });
});
