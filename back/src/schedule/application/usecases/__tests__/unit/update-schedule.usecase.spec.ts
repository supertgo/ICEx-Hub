import { ScheduleInMemoryRepository } from '@/schedule/infrastructure/database/in-memory/repositories/schedule-in-memory.repository';
import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';
import { ScheduleWithIdNotFoundError } from '@/schedule/infrastructure/errors/schedule-with-id-not-found-error';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { UpdateScheduleUsecase } from '@/schedule/application/usecases/update-schedule.usecase';

describe('Update schedule use case test', () => {
  let sut: UpdateScheduleUsecase.UseCase;
  let repository: ScheduleInMemoryRepository;

  beforeEach(() => {
    repository = new ScheduleInMemoryRepository();
    sut = new UpdateScheduleUsecase.UseCase(repository);
  });

  it.todo(
    'should throw scheduleWithIdNotFoundError if schedule does not exist',
  );
});
