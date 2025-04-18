import { ScheduleInMemoryRepository } from '@/schedule/infrastructure/database/in-memory/repositories/schedule-in-memory.repository';
import { ScheduleWithIdNotFoundError } from '@/schedule/infrastructure/errors/schedule-with-id-not-found-error';
import { UpdateScheduleUsecase } from '@/schedule/application/usecases/update-schedule.usecase';

describe('Update schedule use case test', () => {
  let sut: UpdateScheduleUsecase.UseCase;
  let repository: ScheduleInMemoryRepository;

  beforeEach(() => {
    repository = new ScheduleInMemoryRepository();
    sut = new UpdateScheduleUsecase.UseCase(repository);
  });

  it('should throw scheduleWithIdNotFoundError if schedule does not exist', async () => {
    const input = { id: 'invalid-id' };

    await expect(sut.execute(input)).rejects.toThrow(
      new ScheduleWithIdNotFoundError(input.id),
    );
  });
});
