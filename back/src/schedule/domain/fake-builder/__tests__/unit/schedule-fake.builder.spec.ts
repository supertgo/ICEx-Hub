import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ScheduleFakeBuilder } from '@/schedule/domain/fake-builder/schedule-fake.builder';
import {
  DayPatternEnum,
  TimeSlotEnum,
} from '@/schedule/domain/schedule.constants';
import { faker } from '@faker-js/faker';

describe('ScheduleFakeBuilder Unit Tests', () => {
  const fakeEntity = ScheduleFakeBuilder.aSchedule();

  describe('classroomId prop', () => {
    test('should be defined', () => {
      expect(fakeEntity['_classroomId']).toBeDefined();
    });

    test('withClasroomId()', () => {
      const uuid = faker.string.uuid();
      const fakerSchedule =
        ScheduleFakeBuilder.aSchedule().withClasroomId(uuid);

      expect(fakerSchedule['_classroomId']).toBe(uuid);
    });
  });

  describe('discplineId prop', () => {
    test('should be defined', () => {
      expect(fakeEntity['_discplineId']).toBeDefined();
    });

    test('discplineId()', () => {
      const uuid = faker.string.uuid();
      const fakerSchedule =
        ScheduleFakeBuilder.aSchedule().withDisciplineId(uuid);

      expect(fakerSchedule['_discplineId']).toBe(uuid);
    });
  });

  describe('class prop', () => {
    test('should be defined', () => {
      expect(fakeEntity['_class']).toBeDefined();
    });

    test('withClass()', () => {
      const alpha = faker.string.alpha(3);
      const fakerSchedule = ScheduleFakeBuilder.aSchedule().withClass(alpha);

      expect(fakerSchedule['_class']).toBe(alpha);
    });
  });

  describe('dayPattern prop', () => {
    test('should init with a schedule that happens every tuesday and thursday', () => {
      const fakerSchedule = ScheduleFakeBuilder.aSchedule().build();
      expect(fakerSchedule.dayPattern).toBe(DayPatternEnum.TUESDAY_THURSDAY);
    });

    test('should change dayPattern to tuesday', () => {
      const fakerSchedule = ScheduleFakeBuilder.aSchedule().withDayPattern(
        DayPatternEnum.TUESDAY,
      );

      expect(fakerSchedule['_dayPattern']).toBe(DayPatternEnum.TUESDAY);
    });
  });

  describe('timeSlot prop', () => {
    test('should init with a schedule that starts at 19:00 and ends on 20:40', () => {
      const fakerSchedule = ScheduleFakeBuilder.aSchedule().build();
      expect(fakerSchedule.timeSlot).toBe(TimeSlotEnum.EVENING_2);
    });

    test('should change dayPattern to tuesday', () => {
      const fakerSchedule = ScheduleFakeBuilder.aSchedule()
        .withTimeSlot(TimeSlotEnum.AFTERNOON_1)
        .build();

      expect(fakerSchedule.timeSlot).toBe(TimeSlotEnum.AFTERNOON_1);
    });
  });

  describe('createdAt prop', () => {
    const fakerSchedule = ScheduleFakeBuilder.aSchedule();

    test('should throw error when any with methods has been called', () => {
      const fakerSchedule = ScheduleFakeBuilder.aSchedule();

      expect(() => fakerSchedule.createdAt).toThrow(
        new Error(
          "Property createdAt does not have a factory, use 'with' methods",
        ),
      );
    });

    test('should be undefined', () => {
      expect(fakerSchedule['_createdAt']).toBeUndefined();
    });

    test('withCreatedAt()', () => {
      const date = new Date();
      const $this = fakerSchedule.withCreatedAt(date);

      expect($this).toBeInstanceOf(ScheduleFakeBuilder);
      expect(fakerSchedule['_createdAt']).toBe(date);

      fakerSchedule.withCreatedAt(() => date);

      //@ts-expect-error _createdAt is a callable
      expect(fakerSchedule['_createdAt']()).toBe(date);
      expect(fakerSchedule.createdAt).toBe(date);
    });

    test('should pass index to createdAt factory', () => {
      const date = new Date();
      fakerSchedule.withCreatedAt(
        (index) => new Date(date.getTime() + index + 2),
      );

      const schedule = fakerSchedule.build();
      expect(schedule.createdAt.getTime()).toBe(date.getTime() + 2);

      const fakerMany = ScheduleFakeBuilder.theSchedules(2);
      fakerMany.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const schedules = fakerMany.build();

      expect(schedules[0].createdAt.getTime()).toBe(date.getTime() + 2);
      expect(schedules[1].createdAt.getTime()).toBe(date.getTime() + 3);
    });
  });

  describe('updatedAt prop', () => {
    const faker = ScheduleFakeBuilder.aSchedule();

    test('should throw error when any with methods has been called', () => {
      const fakerSchedule = ScheduleFakeBuilder.aSchedule();

      expect(() => fakerSchedule.updatedAt).toThrow(
        new Error(
          "Property updatedAt does not have a factory, use 'with' methods",
        ),
      );
    });

    test('should be undefined', () => {
      expect(faker['_updatedAt']).toBeUndefined();
    });

    test('withUpdatedAt()', () => {
      const date = new Date();
      const $this = faker.withUpdatedAt(date);

      expect($this).toBeInstanceOf(ScheduleFakeBuilder);
      expect(faker['_updatedAt']).toBe(date);

      faker.withUpdatedAt(() => date);

      //@ts-expect-error _updatedAt is a callable
      expect(faker['_updatedAt']()).toBe(date);
      expect(faker.updatedAt).toBe(date);
    });

    test('should pass index to updatedAt factory', () => {
      const date = new Date();
      faker.withUpdatedAt((index) => new Date(date.getTime() + index + 2));

      const schedule = faker.build();
      expect(schedule.updatedAt.getTime()).toBe(date.getTime() + 2);

      const fakerMany = ScheduleFakeBuilder.theSchedules(2);
      fakerMany.withUpdatedAt((index) => new Date(date.getTime() + index + 2));
      const schedules = fakerMany.build();

      expect(schedules[0].updatedAt.getTime()).toBe(date.getTime() + 2);
      expect(schedules[1].updatedAt.getTime()).toBe(date.getTime() + 3);
    });
  });

  describe('build()', () => {
    it('should create a single schedule when count = 1', () => {
      const faker = ScheduleFakeBuilder.aSchedule();
      const schedule = faker.build();

      expect(schedule).toBeInstanceOf(ScheduleEntity);
    });

    it('should create multiple schedules when count > 1', () => {
      const count = 2;
      const faker = ScheduleFakeBuilder.theSchedules(count);
      const schedules = faker.build();

      expect(schedules).toHaveLength(count);
      expect(schedules[0]).toBeInstanceOf(ScheduleEntity);
    });
  });
});
