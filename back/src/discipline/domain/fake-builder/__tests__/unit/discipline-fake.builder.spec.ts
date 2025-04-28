import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { DisciplineFakeBuilder } from '@/discipline/domain/fake-builder/discipline-fake.builder';

describe('DisciplineFakeBuilder Unit Tests', () => {
  describe('code prop', () => {
    const faker = DisciplineFakeBuilder.aDiscipline();

    it('_code should be a function', () => {
      expect(typeof faker['_code']).toBe('function');
    });

    it('withCode()', () => {
      const code = 'DISC123';
      const $this = faker.withCode(code);

      expect($this).toBeInstanceOf(DisciplineFakeBuilder);
      expect(faker['_code']).toBe(code);
    });
  });

  describe('name prop', () => {
    const faker = DisciplineFakeBuilder.aDiscipline();

    it('_name should be a function', () => {
      expect(typeof faker['_name']).toBe('function');
    });

    it('withName()', () => {
      const disciplineName = 'Introduction to Programming';
      const $this = faker.withName(disciplineName);

      expect($this).toBeInstanceOf(DisciplineFakeBuilder);
      expect(faker['_name']).toBe(disciplineName);

      faker.withName(() => disciplineName);

      //@ts-expect-error name is callable
      expect(faker['_name']()).toBe(disciplineName);

      expect(faker.name).toBe(disciplineName);
    });
  });

  describe('courseId prop', () => {
    const faker = DisciplineFakeBuilder.aDiscipline();

    it('_courseId should be a function', () => {
      expect(typeof faker['_courseId']).toBe('function');
    });

    it('withCourseId()', () => {
      const courseId = 'COURSE123';
      const $this = faker.withCourseId(courseId);

      expect($this).toBeInstanceOf(DisciplineFakeBuilder);
      expect(faker['_courseId']).toBe(courseId);
    });
  });

  describe('coursePeriodId prop', () => {
    const faker = DisciplineFakeBuilder.aDiscipline();

    it('_coursePeriodId should be a function', () => {
      expect(typeof faker['_coursePeriodId']).toBe('function');
    });

    it('withCoursePeriodId()', () => {
      const coursePeriodId = 'PERIOD123';
      const $this = faker.withCoursePeriodId(coursePeriodId);

      expect($this).toBeInstanceOf(DisciplineFakeBuilder);
      expect(faker['_coursePeriodId']).toBe(coursePeriodId);
    });
  });

  describe('createdAt prop', () => {
    const faker = DisciplineFakeBuilder.aDiscipline();

    it('should throw error when createdAt is not set', () => {
      expect(() => faker.createdAt).toThrowError(
        "Property createdAt does not have a factory, use 'with' methods",
      );
    });

    it('withCreatedAt()', () => {
      const date = new Date();
      const $this = faker.withCreatedAt(date);

      expect($this).toBeInstanceOf(DisciplineFakeBuilder);
      expect(faker['_createdAt']).toBe(date);
    });
  });

  describe('updatedAt prop', () => {
    const faker = DisciplineFakeBuilder.aDiscipline();

    it('should throw error when updatedAt is not set', () => {
      expect(() => faker.updatedAt).toThrowError(
        "Property updatedAt does not have a factory, use 'with' methods",
      );
    });

    it('withUpdatedAt()', () => {
      const date = new Date();
      const $this = faker.withUpdatedAt(date);

      expect($this).toBeInstanceOf(DisciplineFakeBuilder);
      expect(faker['_updatedAt']).toBe(date);
    });
  });

  describe('build() method', () => {
    it('should create a single discipline when count = 1', () => {
      const faker = DisciplineFakeBuilder.aDiscipline()
        .withName('Test Discipline')
        .withCode('TEST_CODE')
        .withCourseId('COURSE_ID')
        .withCoursePeriodId('PERIOD_ID');

      const discipline = faker.build();

      expect(discipline).toBeInstanceOf(DisciplineEntity);
      expect(discipline.name).toBe('Test Discipline');
      expect(discipline.code).toBe('TEST_CODE');
      expect(discipline.courseId).toBe('COURSE_ID');
      expect(discipline.coursePeriodId).toBe('PERIOD_ID');
    });

    it('should create multiple disciplines when count > 1', () => {
      const fakerMany = DisciplineFakeBuilder.theDisciplines(2)
        .withName((index) => `Discipline ${index}`)
        .withCode((index) => `CODE${index}`)
        .withCourseId((index) => `COURSE${index}`)
        .withCoursePeriodId((index) => `PERIOD${index}`);

      const disciplines = fakerMany.build();

      expect(disciplines).toHaveLength(2);
      expect(disciplines[0]).toBeInstanceOf(DisciplineEntity);
      expect(disciplines[1]).toBeInstanceOf(DisciplineEntity);
      expect(disciplines[0].name).toBe('Discipline 0');
      expect(disciplines[1].name).toBe('Discipline 1');
      expect(disciplines[0].code).toBe('CODE0');
      expect(disciplines[1].code).toBe('CODE1');
      expect(disciplines[0].courseId).toBe('COURSE0');
      expect(disciplines[1].courseId).toBe('COURSE1');
      expect(disciplines[0].coursePeriodId).toBe('PERIOD0');
      expect(disciplines[1].coursePeriodId).toBe('PERIOD1');
    });
  });
});
