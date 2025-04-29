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
      const faker = DisciplineFakeBuilder.aDiscipline();
      const discipline = faker.build();

      expect(discipline).toBeInstanceOf(DisciplineEntity);
      expect(discipline.name).toBeDefined();
      expect(discipline.code).toBeDefined();
    });

    it('should create multiple disciplines when count > 1', () => {
      const count = 2;
      const fakerMany = DisciplineFakeBuilder.theDisciplines(count);
      const disciplines = fakerMany.build();

      expect(disciplines).toHaveLength(count);
      expect(disciplines[0]).toBeInstanceOf(DisciplineEntity);
      expect(disciplines[1]).toBeInstanceOf(DisciplineEntity);
      expect(disciplines[0].code).not.toBe(disciplines[1].code);
    });
  });

  it('should throw error when accessing unset properties', () => {
    const faker = DisciplineFakeBuilder.aDiscipline();

    expect(() => faker.createdAt).toThrowError(
      "Property createdAt does not have a factory, use 'with' methods",
    );
    expect(() => faker.updatedAt).toThrowError(
      "Property updatedAt does not have a factory, use 'with' methods",
    );
  });

  it('should return dynamic properties correctly', () => {
    const disciplineName = 'Dynamic Name';
    const disciplineCode = 'DYNAMIC123';

    const faker = DisciplineFakeBuilder.aDiscipline()
      .withName(disciplineName)
      .withCode(disciplineCode);

    expect(faker.name).toBe(disciplineName);
    expect(faker.code).toBe(disciplineCode);
  });

  it('should apply custom properties and factories to multiple disciplines', () => {
    const count = 3;
    const nameFactory = jest.fn((index) => `Discipline ${index + 1}`);
    const codeFactory = jest.fn((index) => `CODE${index + 1}`);

    const disciplines = DisciplineFakeBuilder.theDisciplines(count)
      .withName(nameFactory)
      .withCode(codeFactory)
      .build();

    expect(disciplines).toHaveLength(count);
    disciplines.forEach((discipline, index) => {
      expect(discipline.name).toBe(`Discipline ${index + 1}`);
      expect(discipline.code).toBe(`CODE${index + 1}`);
    });
  });

  it('should use factory functions for properties', () => {
    const nameFactory = jest.fn(() => 'Factory Name');
    const codeFactory = jest.fn(() => 'FACTORY123');

    const discipline = DisciplineFakeBuilder.aDiscipline()
      .withName(nameFactory)
      .withCode(codeFactory)
      .build();

    expect(nameFactory).toHaveBeenCalled();
    expect(codeFactory).toHaveBeenCalled();
    expect(discipline.name).toBe('Factory Name');
    expect(discipline.code).toBe('FACTORY123');
  });

  it('should set countObjs correctly when using theDisciplines()', () => {
    const count = 5;
    const fakerMany = DisciplineFakeBuilder.theDisciplines(count);

    expect(fakerMany['countObjs']).toBe(count);
  });
});
