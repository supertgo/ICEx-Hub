import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ScheduleFakeBuilder } from '@/schedule/domain/fake-builder/schedule-fake.builder';

describe('ScheduleFakeBuilder Unit Tests', () => {
  describe('code prop', () => {
    const faker = ScheduleFakeBuilder.aSchedule();

    it('_code should be a function', () => {
      expect(typeof faker['_code']).toBe('function');
    });


  describe('name prop', () => {
    const faker = ScheduleFakeBuilder.aSchedule();

    it('_name should be a function', () => {
      expect(typeof faker['_name']).toBe('function');
    });

    it('withName()', () => {
      const scheduleName = 'Introduction to Programming';
      const $this = faker.withName(scheduleName);

      expect($this).toBeInstanceOf(ScheduleFakeBuilder);
      expect(faker['_name']).toBe(scheduleName);

      faker.withName(() => scheduleName);

      //@ts-expect-error name is callable
      expect(faker['_name']()).toBe(scheduleName);

      expect(faker.name).toBe(scheduleName);
    });

    it('should pass index to name factory', () => {
      faker.withName((index) => `Schedule ${index}`);
      const schedule = faker.build();

      expect(schedule.name).toBe('Schedule 0');

      const fakerMany = ScheduleFakeBuilder.theSchedules(2);
      fakerMany.withName((index) => `Schedule ${index}`);

      const schedules = fakerMany.build();

      expect(schedules[0].name).toBe('Schedule 0');
      expect(schedules[1].name).toBe('Schedule 1');
    });

  describe('createdAt prop', () => {
    const faker = ScheduleFakeBuilder.aSchedule();

    test('should throw error when any with methods has been called', () => {
      const fakerSchedule = ScheduleFakeBuilder.aSchedule();

      expect(() => fakerSchedule.createdAt).toThrow(
        new Error(
          'Property createdAt does not have a factory, use \'with\' methods',
        ),
      );
    });

    test('should be undefined', () => {
      expect(faker['_createdAt']).toBeUndefined();
    });

    test('withCreatedAt()', () => {
      const date = new Date();
      const $this = faker.withCreatedAt(date);

      expect($this).toBeInstanceOf(ScheduleFakeBuilder);
      expect(faker['_createdAt']).toBe(date);

      faker.withCreatedAt(() => date);

      //@ts-expect-error _createdAt is a callable
      expect(faker['_createdAt']()).toBe(date);
      expect(faker.createdAt).toBe(date);
    });

    test('should pass index to createdAt factory', () => {
      const date = new Date();
      faker.withCreatedAt((index) => new Date(date.getTime() + index + 2));

      const schedule = faker.build();
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
          'Property updatedAt does not have a factory, use \'with\' methods',
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

  describe('build() method', () => {
    it('should create a single schedule when count = 1', () => {
      const faker = ScheduleFakeBuilder.aSchedule();
      const schedule = faker.build();

      expect(schedule).toBeInstanceOf(ScheduleEntity);
      expect(schedule.code).toBeDefined();
      expect(schedule.name).toBeDefined();
    });

    it('should create multiple schedules when count > 1', () => {
      const count = 2;
      const faker = ScheduleFakeBuilder.theSchedules(count);
      const schedules = faker.build();

      expect(schedules).toHaveLength(count);
      expect(schedules[0]).toBeInstanceOf(ScheduleEntity);
      expect(schedules[1]).toBeInstanceOf(ScheduleEntity);
      expect(schedules[0].code).not.toBe(schedules[1].code);
    });
  });
});
