import { ScheduleInMemoryRepository } from '@/schedule/infrastructure/database/in-memory/repositories/schedule-in-memory.repository';
import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';
import {
  ScheduleEntity,
  ScheduleProps,
} from '@/schedule/domain/entities/schedule.entity';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { TimeSlotEnum } from '@/schedule/domain/schedule.constants';

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

    it('should return items with timeSlot morning 1', async () => {
      const items = [
        ScheduleEntity.fake()
          .aSchedule()
          .withTimeSlot(TimeSlotEnum.MORNING_1)
          .build(),
        ScheduleEntity.fake()
          .aSchedule()
          .withTimeSlot(TimeSlotEnum.MORNING_2)
          .build(),
        ScheduleEntity.fake()
          .aSchedule()
          .withTimeSlot(TimeSlotEnum.MORNING_3)
          .build(),
      ];

      const spyFilter = jest.spyOn(items, 'filter');

      const result = await sut['applyFilters'](items, {
        timeSlots: [TimeSlotEnum.MORNING_1],
      });

      expect(result).toStrictEqual([items[0]]);
      expect(spyFilter).toHaveBeenCalledTimes(1);
    });
  });

  describe('apply sort method', () => {
    it('should filter by created dated by default', async () => {
      const date = new Date();
      const items = [
        ScheduleEntity.fake().aSchedule().withCreatedAt(date).build(),
        ScheduleEntity.fake()
          .aSchedule()
          .withCreatedAt(new Date(date.getTime() + 1))
          .build(),
        ScheduleEntity.fake()
          .aSchedule()
          .withCreatedAt(new Date(date.getTime() + 2))
          .build(),
      ];

      const result = await sut['applySort'](
        items,
        'createdAt',
        SortOrderEnum.ASC,
      );

      expect(result[0]).toStrictEqual(items[0]);
      expect(result[1]).toStrictEqual(items[1]);
      expect(result[2]).toStrictEqual(items[2]);
    });

    test('should filter by created dated with desc order', async () => {
      const date = new Date();
      const items = [
        ScheduleEntity.fake().aSchedule().withCreatedAt(date).build(),
        ScheduleEntity.fake()
          .aSchedule()
          .withCreatedAt(new Date(date.getTime() + 1))
          .build(),
        ScheduleEntity.fake()
          .aSchedule()
          .withCreatedAt(new Date(date.getTime() + 2))
          .build(),
      ];

      const result = await sut['applySort'](
        items,
        'createdAt',
        SortOrderEnum.DESC,
      );

      expect(result[0]).toStrictEqual(items[2]);
      expect(result[1]).toStrictEqual(items[1]);
      expect(result[2]).toStrictEqual(items[0]);
    });
  });
});
