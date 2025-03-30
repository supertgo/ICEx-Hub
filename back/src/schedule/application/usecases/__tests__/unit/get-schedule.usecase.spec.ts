import { ScheduleInMemoryRepository } from '@/schedule/infrastructure/database/in-memory/repositories/schedule-in-memory.repository';
import { GetScheduleUsecase } from '@/schedule/application/usecases/get-schedule.usecase';
import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';
import { ScheduleWithIdNotFoundError } from '@/schedule/infrastructure/errors/schedule-with-id-not-found-error';

describe('Get schedule use case test', () => {
  let sut: GetScheduleUsecase.UseCase;
  let repository: ScheduleInMemoryRepository;

  beforeEach(() => {
    repository = new ScheduleInMemoryRepository();
    sut = new GetScheduleUsecase.UseCase(repository);
  });

  it('should throw ScheduleWithEmailNotFoundError if schedule does not exist', async () => {
    const input = { id: 'non-existent-id' };

    await expect(sut.execute(input)).rejects.toThrow(
      new ScheduleWithIdNotFoundError(input.id),
    );
  });

  it('should return schedule details if schedule exists', async () => {
    const schedule = new ScheduleEntity(ScheduleDataBuilder({}));
    await repository.insert(schedule);

    const input = { id: schedule.id };

    const result = await sut.execute(input);

    expect(result).toStrictEqual(schedule.toJSON());
  });

  it('should call repository findById with correct ID', async () => {
    const schedule = new ScheduleEntity(ScheduleDataBuilder({}));
    await repository.insert(schedule);

    const spyFindById = jest.spyOn(repository, 'findById');

    const input = { id: schedule.id };

    await sut.execute(input);

    expect(spyFindById).toHaveBeenCalledWith(schedule.id);
  });
});
