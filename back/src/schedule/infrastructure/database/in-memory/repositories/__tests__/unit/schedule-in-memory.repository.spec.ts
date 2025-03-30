import { ScheduleInMemoryRepository } from '@/schedule/infrastructure/database/in-memory/repositories/schedule-in-memory.repository';
import { ScheduleWithEmailNotFoundError } from '@/schedule/domain/errors/schedule-with-email-not-found-error';
import { faker } from '@faker-js/faker';
import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';
import { ScheduleEntity, ScheduleProps } from '@/schedule/domain/entities/schedule.entity';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

function createScheduleEntity(scheduleProps: Partial<ScheduleProps> = {}) {
  return new ScheduleEntity(ScheduleDataBuilder(scheduleProps));
}

describe('schedule in memory repository', () => {
  let sut: ScheduleInMemoryRepository;

  beforeEach(() => {
    sut = new ScheduleInMemoryRepository();
  });

  describe('apply filters method', () => {
    it('should return item with null filter', async () => {
      const items = Array.from({ length: 3 }, () => createScheduleEntity());

      const spyFilter = jest.spyOn(items, 'filter');

      const result = await sut['applyFilters'](items, null);

      expect(result).toStrictEqual(items);
      expect(spyFilter).not.toHaveBeenCalled();
    });

  });

  describe('apply sort method', () => { });
});
