import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';
import { CoursePeriodFakeBuilder } from '@/course/domain/fake-builder/course-period-fake.builder';

describe('CoursePeriodFakeBuilder Unit Tests', () => {
  describe('name prop', () => {
    const faker = CoursePeriodFakeBuilder.aCoursePeriod();

    it('_name should be a function', () => {
      expect(typeof faker['_name']).toBe('function');
    });

    it('withName()', () => {
      const periodName = 'Summer 2023';
      const $this = faker.withName(periodName);

      expect($this).toBeInstanceOf(CoursePeriodFakeBuilder);
      expect(faker['_name']).toBe(periodName);

      faker.withName(() => periodName);

      //@ts-expect-error name is callable
      expect(faker['_name']()).toBe(periodName);

      expect(faker.name).toBe(periodName);
    });

    it('should pass index to name factory', () => {
      faker.withName((index) => `Period ${index}`);
      const coursePeriod = faker.build();

      expect(coursePeriod.name).toBe('Period 0');

      const fakerMany = CoursePeriodFakeBuilder.theCoursePeriods(2);
      fakerMany.withName((index) => `Period ${index}`);

      const coursePeriods = fakerMany.build();

      expect(coursePeriods[0].name).toBe('Period 0');
      expect(coursePeriods[1].name).toBe('Period 1');
    });

    it('withInvalidNameEmpty()', () => {
      const $this = faker.withInvalidNameEmpty();

      expect($this).toBeInstanceOf(CoursePeriodFakeBuilder);
      expect(faker['_name']).toBe('');
    });

    it('withInvalidNameTooLong()', () => {
      const $this = faker.withInvalidNameTooLong();

      expect($this).toBeInstanceOf(CoursePeriodFakeBuilder);
      expect(faker['_name'].length).toBeGreaterThan(50);

      const nameTooLong = 'N'.repeat(51);
      faker.withInvalidNameTooLong(nameTooLong);

      expect(faker['_name'].length).toBe(51);
      expect(faker['_name']).toBe(nameTooLong);
    });
  });

  describe('courseId prop', () => {
    const faker = CoursePeriodFakeBuilder.aCoursePeriod();

    test('should throw error when any with methods has not been called', () => {
      const fakerCoursePeriod = CoursePeriodFakeBuilder.aCoursePeriod();

      expect(() => fakerCoursePeriod.courseId).toThrow(
        new Error(
          "Property courseId does not have a factory, use 'with' methods",
        ),
      );
    });

    test('should be undefined', () => {
      expect(faker['_courseId']).toBeUndefined();
    });

    test('withCourseId()', () => {
      const courseId = 'course-id-123';
      const $this = faker.withCourseId(courseId);

      expect($this).toBeInstanceOf(CoursePeriodFakeBuilder);
      expect(faker['_courseId']).toBe(courseId);

      faker.withCourseId(() => courseId);

      //@ts-expect-error _courseId is a callable
      expect(faker['_courseId']()).toBe(courseId);
      expect(faker.courseId).toBe(courseId);
    });

    test('should pass index to courseId factory', () => {
      faker.withCourseId((index) => `course-id-${index}`);
      const coursePeriod = faker.build();

      expect(coursePeriod.courseId).toBe('course-id-0');

      const fakerMany = CoursePeriodFakeBuilder.theCoursePeriods(2);
      fakerMany.withCourseId((index) => `course-id-${index}`);

      const coursePeriods = fakerMany.build();

      expect(coursePeriods[0].courseId).toBe('course-id-0');
      expect(coursePeriods[1].courseId).toBe('course-id-1');
    });
  });

  describe('createdAt prop', () => {
    const faker = CoursePeriodFakeBuilder.aCoursePeriod();

    test('should throw error when any with methods has not been called', () => {
      const fakerCoursePeriod = CoursePeriodFakeBuilder.aCoursePeriod();

      expect(() => fakerCoursePeriod.createdAt).toThrow(
        new Error(
          "Property createdAt does not have a factory, use 'with' methods",
        ),
      );
    });

    test('should be undefined', () => {
      expect(faker['_createdAt']).toBeUndefined();
    });

    test('withCreatedAt()', () => {
      const date = new Date();
      const $this = faker.withCreatedAt(date);

      expect($this).toBeInstanceOf(CoursePeriodFakeBuilder);
      expect(faker['_createdAt']).toBe(date);

      faker.withCreatedAt(() => date);

      //@ts-expect-error _createdAt is a callable
      expect(faker['_createdAt']()).toBe(date);
      expect(faker.createdAt).toBe(date);
    });

    test('should pass index to createdAt factory', () => {
      const date = new Date();
      faker.withCreatedAt((index) => new Date(date.getTime() + index + 2));

      const coursePeriod = faker.build();
      expect(coursePeriod.createdAt.getTime()).toBe(date.getTime() + 2);

      const fakerMany = CoursePeriodFakeBuilder.theCoursePeriods(2);
      fakerMany.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const coursePeriods = fakerMany.build();

      expect(coursePeriods[0].createdAt.getTime()).toBe(date.getTime() + 2);
      expect(coursePeriods[1].createdAt.getTime()).toBe(date.getTime() + 3);
    });
  });

  describe('updatedAt prop', () => {
    const faker = CoursePeriodFakeBuilder.aCoursePeriod();

    test('should throw error when any with methods has not been called', () => {
      const fakerCoursePeriod = CoursePeriodFakeBuilder.aCoursePeriod();

      expect(() => fakerCoursePeriod.updatedAt).toThrow(
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

      expect($this).toBeInstanceOf(CoursePeriodFakeBuilder);
      expect(faker['_updatedAt']).toBe(date);

      faker.withUpdatedAt(() => date);

      //@ts-expect-error _updatedAt is a callable
      expect(faker['_updatedAt']()).toBe(date);
      expect(faker.updatedAt).toBe(date);
    });

    test('should pass index to updatedAt factory', () => {
      const date = new Date();
      faker.withUpdatedAt((index) => new Date(date.getTime() + index + 2));

      const coursePeriod = faker.build();
      expect(coursePeriod.updatedAt.getTime()).toBe(date.getTime() + 2);

      const fakerMany = CoursePeriodFakeBuilder.theCoursePeriods(2);
      fakerMany.withUpdatedAt((index) => new Date(date.getTime() + index + 2));
      const coursePeriods = fakerMany.build();

      expect(coursePeriods[0].updatedAt.getTime()).toBe(date.getTime() + 2);
      expect(coursePeriods[1].updatedAt.getTime()).toBe(date.getTime() + 3);
    });
  });

  describe('build() method', () => {
    it('should create a single course period when count = 1', () => {
      const faker = CoursePeriodFakeBuilder.aCoursePeriod();
      const coursePeriod = faker.build();

      expect(coursePeriod).toBeInstanceOf(CoursePeriodEntity);
      expect(coursePeriod.name).toBeDefined();
    });

    it('should create multiple course periods when count > 1', () => {
      const count = 2;
      const faker = CoursePeriodFakeBuilder.theCoursePeriods(count);
      const coursePeriods = faker.build();

      expect(coursePeriods).toHaveLength(count);
      expect(coursePeriods[0]).toBeInstanceOf(CoursePeriodEntity);
      expect(coursePeriods[1]).toBeInstanceOf(CoursePeriodEntity);
      expect(coursePeriods[0].name).not.toBe(coursePeriods[1].name);
    });

    it('should include courseId when provided', () => {
      const courseId = 'test-course-id';
      const faker = CoursePeriodFakeBuilder.aCoursePeriod()
        .withCourseId(courseId);
      const coursePeriod = faker.build();

      expect(coursePeriod.courseId).toBe(courseId);
    });

    it('should generate different courseIds when using factory', () => {
      const faker = CoursePeriodFakeBuilder.theCoursePeriods(2)
        .withCourseId((index) => `course-${index}`);
      const coursePeriods = faker.build();

      expect(coursePeriods[0].courseId).toBe('course-0');
      expect(coursePeriods[1].courseId).toBe('course-1');
    });
  });

  describe('static methods', () => {
    it('should create a single course period with aCoursePeriod()', () => {
      const faker = CoursePeriodFakeBuilder.aCoursePeriod();
      expect(faker['countObjs']).toBe(1);
    });

    it('should create multiple course periods with theCoursePeriods()', () => {
      const count = 3;
      const faker = CoursePeriodFakeBuilder.theCoursePeriods(count);
      expect(faker['countObjs']).toBe(count);
    });
  });
});
