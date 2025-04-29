import {
  ScheduleEntity,
  ScheduleProps,
} from '@/schedule/domain/entities/schedule.entity';
import {
  DayPatternEnum,
  TimeSlotEnum,
} from '@/schedule/domain/schedule.constants';
import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';

describe('Schedule integration tests', () => {
  it('should throw error with classroomId code', () => {
    const props = {
      ...ScheduleDataBuilder({}),
      classroomId: 'test',
    };

    expect(() => new ScheduleEntity(props)).toThrow(EntityValidationError);
  });

  it('should throw error with classroomId', () => {
    const props: ScheduleProps = {
      ...ScheduleDataBuilder({}),
      classroomId: 'test',
    };

    expect(() => new ScheduleEntity(props)).toThrow(EntityValidationError);
  });

  it('should throw error with disciplineId', () => {
    const props: ScheduleProps = {
      ...ScheduleDataBuilder({}),
      disciplineId: 'test',
    };

    expect(() => new ScheduleEntity(props)).toThrow(EntityValidationError);
  });

  it('should throw error with invalid dayPattern', () => {
    const props: ScheduleProps = {
      ...ScheduleDataBuilder({}),
      dayPattern: undefined as DayPatternEnum,
    };

    expect(() => new ScheduleEntity(props)).toThrow(EntityValidationError);
  });

  it('should throw error with invalid timeSlot', () => {
    const props: ScheduleProps = {
      ...ScheduleDataBuilder({}),
      timeSlot: undefined as TimeSlotEnum,
    };

    expect(() => new ScheduleEntity(props)).toThrow(EntityValidationError);
  });

  it('should throw error with an invalid class', () => {
    const props = {
      ...ScheduleDataBuilder({}),
      class: undefined as string,
    };

    expect(() => new ScheduleEntity(props)).toThrow(EntityValidationError);
  });
});
