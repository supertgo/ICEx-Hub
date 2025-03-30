import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ListSchedulesUsecase } from '@/schedule/application/usecases/list-schedule.usecase';
import { ScheduleInMemoryRepository } from '@/schedule/infrastructure/database/in-memory/repositories/schedule-in-memory.repository';
import { ScheduleRepository } from '@/schedule/domain/repositories/schedule.repository';
import { ScheduleEntity, scheduleProps } from '@/schedule/domain/entities/schedule.entity';
import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';

describe('List schedules use cases unit tests', () => {
  function createScheduleEntity(scheduleProps: Partial<ScheduleProps> = {}) {
    return new ScheduleEntity(ScheduleDataBuilder(scheduleProps));
  }

  let sut: ListSchedulesUsecase.UseCase;
  let repository: ScheduleInMemoryRepository;

  beforeEach(() => {
    repository = new ScheduleInMemoryRepository();
    sut = new ListSchedulesUsecase.UseCase(repository);
  });

  describe('test to output', () => {
    it('should return empty result in output', () => {
      const result = new ScheduleRepository.SearchResult({
        items: [],
        total: 1,
        currentPage: 1,
        perPage: 1,
        sort: null,
        sortDir: null,
        filter: null,
      });

      const output = sut['toOutput'](result);

      expect(output).toStrictEqual({
        items: [],
        total: 1,
        currentPage: 1,
        lastPage: 1,
        perPage: 1,
      });
    });

    it('should return schedule entity result in output', () => {
      const entity = new ScheduleEntity(ScheduleDataBuilder({}));
      const result = new ScheduleRepository.SearchResult({
        items: [entity],
        total: 1,
        currentPage: 1,
        perPage: 1,
        sort: null,
        sortDir: null,
        filter: null,
      });

      const output = sut['toOutput'](result);

      expect(output).toStrictEqual({
        items: [entity.toJSON()],
        total: 1,
        currentPage: 1,
        lastPage: 1,
        perPage: 1,
      });
    });
  });

  it('should return sorted by created at by default', async () => {
    const initialDate = new Date();
    const schedules = [
      createScheduleEntity({ createdAt: initialDate }),
      createScheduleEntity({ createdAt: new Date(initialDate.getTime() + 1) }),
      createScheduleEntity({ createdAt: new Date(initialDate.getTime() + 2) }),
    ];
    repository.items = schedules;

    const result = await sut.execute({});

    expect(result.total).toBe(schedules.length);
    expect(result.currentPage).toBe(1);
    expect(result.lastPage).toBe(1);
    expect(result.perPage).toBe(10);

    expect(result.items[0].createdAt.getTime()).toStrictEqual(
      initialDate.getTime() + 2,
    );

    expect(result.items[1].createdAt.getTime()).toStrictEqual(
      initialDate.getTime() + 1,
    );
    expect(result.items[2].createdAt.getTime()).toStrictEqual(
      initialDate.getTime(),
    );
  });

  it('should return schedules filtered, paginated and sorted', async () => {
    const schedules = [
      createScheduleEntity({ name: 'a' }),
      createScheduleEntity({ name: 'A' }),
      createScheduleEntity({ name: 'b' }),
      createScheduleEntity({ name: 'c' }),
    ];
    repository.items = schedules;

    const result = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: SortOrderEnum.ASC,
      filter: 'a',
    });

    expect(result.total).toBe(2);
    expect(result.currentPage).toBe(1);
    expect(result.lastPage).toBe(1);
    expect(result.perPage).toBe(2);

    expect(result.items[0].name).toBe('A');
    expect(result.items[1].name).toBe('a');
  });

  it.todo('should return second page when empty in pagination', async () => {
  });

  it.todo('should return items in second page when having them', async () => {
  });

  it.todo('should return empty result when no filter found', async () => {
  });
});
