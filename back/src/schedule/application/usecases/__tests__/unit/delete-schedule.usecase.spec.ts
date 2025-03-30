import { ScheduleInMemoryRepository } from '@/schedule/infrastructure/database/in-memory/repositories/schedule-in-memory.repository';
import { GetScheduleUsecase } from '@/schedule/application/usecases/get-schedule.usecase';
import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { DeleteScheduleUsecase } from '@/schedule/application/usecases/delete-schedule.usecase';

describe('Delete schedule use case test', () => {
  let sut: DeleteScheduleUsecase.UseCase;
  let repository: ScheduleInMemoryRepository;

  beforeEach(() => {
    repository = new ScheduleInMemoryRepository();
    sut = new DeleteScheduleUsecase.UseCase(repository);
  });

  it('should throw exception if schedule does not exist', async () => {
    const input = { id: 'non-existent-id' };

    await expect(sut.execute(input)).rejects.toThrow(
    );
  });


  it('should call repository delete with correct ID', async () => {
    const schedule = new ScheduleEntity();
    await repository.insert(schedule);

    const spyDelete = jest.spyOn(repository, 'delete');

    const input = { id: schedule.id };

    expect(repository.items).toHaveLength(1)
    await sut.execute(input);

    expect(spyDelete).toHaveBeenCalledWith(schedule.id);

    expect(repository.items).toHaveLength(0)
  });
});
