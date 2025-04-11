import { CourseEntity } from '@/course/domain/entities/course.entity';
import { CourseFakeBuilder } from '@/course/domain/fake-builder/course-fake.builder';

describe('CourseFakeBuilder Unit Tests', () => {
  describe('code prop', () => {
    const faker = CourseFakeBuilder.aCourse();

    it('_code should be a function', () => {
      expect(typeof faker['_code']).toBe('function');
    });

    it('withCode()', () => {
      const courseCode = 'CS101';
      const $this = faker.withCode(courseCode);

      expect($this).toBeInstanceOf(CourseFakeBuilder);
      expect(faker['_code']).toBe(courseCode);

      faker.withCode(() => courseCode);

      //@ts-expect-error code is callable
      expect(faker['_code']()).toBe(courseCode);

      expect(faker.code).toBe(courseCode);
    });

    it('should pass index to code factory', () => {
      faker.withCode((index) => `CODE${index}`);
      const course = faker.build();

      expect(course.code).toBe('CODE0');

      const fakerMany = CourseFakeBuilder.theCourses(2);
      fakerMany.withCode((index) => `CODE${index}`);

      const courses = fakerMany.build();

      expect(courses[0].code).toBe('CODE0');
      expect(courses[1].code).toBe('CODE1');
    });

    it('withInvalidCodeEmpty()', () => {
      const $this = faker.withInvalidCodeEmpty();

      expect($this).toBeInstanceOf(CourseFakeBuilder);
      expect(faker['_code']).toBe('');
    });

    it('withInvalidCodeTooLong()', () => {
      const $this = faker.withInvalidCodeTooLong();

      expect($this).toBeInstanceOf(CourseFakeBuilder);
      expect(faker['_code'].length).toBeGreaterThan(20);

      const codeTooLong = 'C'.repeat(21);
      faker.withInvalidCodeTooLong(codeTooLong);

      expect(faker['_code'].length).toBe(21);
      expect(faker['_code']).toBe(codeTooLong);
    });
  });

  describe('name prop', () => {
    const faker = CourseFakeBuilder.aCourse();

    it('_name should be a function', () => {
      expect(typeof faker['_name']).toBe('function');
    });

    it('withName()', () => {
      const courseName = 'Introduction to Programming';
      const $this = faker.withName(courseName);

      expect($this).toBeInstanceOf(CourseFakeBuilder);
      expect(faker['_name']).toBe(courseName);

      faker.withName(() => courseName);

      //@ts-expect-error name is callable
      expect(faker['_name']()).toBe(courseName);

      expect(faker.name).toBe(courseName);
    });

    it('should pass index to name factory', () => {
      faker.withName((index) => `Course ${index}`);
      const course = faker.build();

      expect(course.name).toBe('Course 0');

      const fakerMany = CourseFakeBuilder.theCourses(2);
      fakerMany.withName((index) => `Course ${index}`);

      const courses = fakerMany.build();

      expect(courses[0].name).toBe('Course 0');
      expect(courses[1].name).toBe('Course 1');
    });

    it('withInvalidNameEmpty()', () => {
      const $this = faker.withInvalidNameEmpty();

      expect($this).toBeInstanceOf(CourseFakeBuilder);
      expect(faker['_name']).toBe('');
    });

    it('withInvalidNameTooLong()', () => {
      const $this = faker.withInvalidNameTooLong();

      expect($this).toBeInstanceOf(CourseFakeBuilder);
      expect(faker['_name'].length).toBeGreaterThan(50);

      const nameTooLong = 'N'.repeat(51);
      faker.withInvalidNameTooLong(nameTooLong);

      expect(faker['_name'].length).toBe(51);
      expect(faker['_name']).toBe(nameTooLong);
    });
  });

  describe('createdAt prop', () => {
    const faker = CourseFakeBuilder.aCourse();

    test('should throw error when any with methods has been called', () => {
      const fakerCourse = CourseFakeBuilder.aCourse();

      expect(() => fakerCourse.createdAt).toThrow(
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

      expect($this).toBeInstanceOf(CourseFakeBuilder);
      expect(faker['_createdAt']).toBe(date);

      faker.withCreatedAt(() => date);

      //@ts-expect-error _createdAt is a callable
      expect(faker['_createdAt']()).toBe(date);
      expect(faker.createdAt).toBe(date);
    });

    test('should pass index to createdAt factory', () => {
      const date = new Date();
      faker.withCreatedAt((index) => new Date(date.getTime() + index + 2));

      const course = faker.build();
      expect(course.createdAt.getTime()).toBe(date.getTime() + 2);

      const fakerMany = CourseFakeBuilder.theCourses(2);
      fakerMany.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const courses = fakerMany.build();

      expect(courses[0].createdAt.getTime()).toBe(date.getTime() + 2);
      expect(courses[1].createdAt.getTime()).toBe(date.getTime() + 3);
    });
  });

  describe('updatedAt prop', () => {
    const faker = CourseFakeBuilder.aCourse();

    test('should throw error when any with methods has been called', () => {
      const fakerCourse = CourseFakeBuilder.aCourse();

      expect(() => fakerCourse.updatedAt).toThrow(
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

      expect($this).toBeInstanceOf(CourseFakeBuilder);
      expect(faker['_updatedAt']).toBe(date);

      faker.withUpdatedAt(() => date);

      //@ts-expect-error _updatedAt is a callable
      expect(faker['_updatedAt']()).toBe(date);
      expect(faker.updatedAt).toBe(date);
    });

    test('should pass index to updatedAt factory', () => {
      const date = new Date();
      faker.withUpdatedAt((index) => new Date(date.getTime() + index + 2));

      const course = faker.build();
      expect(course.updatedAt.getTime()).toBe(date.getTime() + 2);

      const fakerMany = CourseFakeBuilder.theCourses(2);
      fakerMany.withUpdatedAt((index) => new Date(date.getTime() + index + 2));
      const courses = fakerMany.build();

      expect(courses[0].updatedAt.getTime()).toBe(date.getTime() + 2);
      expect(courses[1].updatedAt.getTime()).toBe(date.getTime() + 3);
    });
  });

  describe('build() method', () => {
    it('should create a single course when count = 1', () => {
      const faker = CourseFakeBuilder.aCourse();
      const course = faker.build();

      expect(course).toBeInstanceOf(CourseEntity);
      expect(course.code).toBeDefined();
      expect(course.name).toBeDefined();
    });

    it('should create multiple courses when count > 1', () => {
      const count = 2;
      const faker = CourseFakeBuilder.theCourses(count);
      const courses = faker.build();

      expect(courses).toHaveLength(count);
      expect(courses[0]).toBeInstanceOf(CourseEntity);
      expect(courses[1]).toBeInstanceOf(CourseEntity);
      expect(courses[0].code).not.toBe(courses[1].code);
    });
  });
});
