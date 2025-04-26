import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { DisciplineFakeBuilder } from '@/discipline/domain/fake-builder/discipline-fake.builder';

describe('DisciplineFakeBuilder Unit Tests', () => {
  describe('code prop', () => {
    const faker = DisciplineFakeBuilder.aDiscipline();

    it('_code should be a function', () => {
      expect(typeof faker['_code']).toBe('function');
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

    it('should pass index to name factory', () => {
      faker.withName((index) => `Discipline ${index}`);
      const discipline = faker.build();

      expect(discipline.name).toBe('Discipline 0');

      const fakerMany = DisciplineFakeBuilder.theDisciplines(2);
      fakerMany.withName((index) => `Discipline ${index}`);

      const disciplines = fakerMany.build();

      expect(disciplines[0].name).toBe('Discipline 0');
      expect(disciplines[1].name).toBe('Discipline 1');
    });
  });

  describe('createdAt prop', () => {
    const faker = DisciplineFakeBuilder.aDiscipline();

    test('should throw error when any with methods has been called', () => {
      const fakerDiscipline = DisciplineFakeBuilder.aDiscipline();

      expect(() => fakerDiscipline.createdAt).toThrow(
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

      expect($this).toBeInstanceOf(DisciplineFakeBuilder);
      expect(faker['_createdAt']).toBe(date);

      faker.withCreatedAt(() => date);

      //@ts-expect-error _createdAt is a callable
      expect(faker['_createdAt']()).toBe(date);
      expect(faker.createdAt).toBe(date);
    });

    test('should pass index to createdAt factory', () => {
      const date = new Date();
      faker.withCreatedAt((index) => new Date(date.getTime() + index + 2));

      const discipline = faker.build();
      expect(discipline.createdAt.getTime()).toBe(date.getTime() + 2);

      const fakerMany = DisciplineFakeBuilder.theDisciplines(2);
      fakerMany.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const disciplines = fakerMany.build();

      expect(disciplines[0].createdAt.getTime()).toBe(date.getTime() + 2);
      expect(disciplines[1].createdAt.getTime()).toBe(date.getTime() + 3);
    });
  });

  describe('updatedAt prop', () => {
    const faker = DisciplineFakeBuilder.aDiscipline();

    test('should throw error when any with methods has been called', () => {
      const fakerDiscipline = DisciplineFakeBuilder.aDiscipline();

      expect(() => fakerDiscipline.updatedAt).toThrow(
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

      expect($this).toBeInstanceOf(DisciplineFakeBuilder);
      expect(faker['_updatedAt']).toBe(date);

      faker.withUpdatedAt(() => date);

      //@ts-expect-error _updatedAt is a callable
      expect(faker['_updatedAt']()).toBe(date);
      expect(faker.updatedAt).toBe(date);
    });

    test('should pass index to updatedAt factory', () => {
      const date = new Date();
      faker.withUpdatedAt((index) => new Date(date.getTime() + index + 2));

      const discipline = faker.build();
      expect(discipline.updatedAt.getTime()).toBe(date.getTime() + 2);

      const fakerMany = DisciplineFakeBuilder.theDisciplines(2);
      fakerMany.withUpdatedAt((index) => new Date(date.getTime() + index + 2));
      const disciplines = fakerMany.build();

      expect(disciplines[0].updatedAt.getTime()).toBe(date.getTime() + 2);
      expect(disciplines[1].updatedAt.getTime()).toBe(date.getTime() + 3);
    });
  });

  describe('build() method', () => {
    it('should create a single discipline when count = 1', () => {
      const faker = DisciplineFakeBuilder.aDiscipline();
      const discipline = faker.build();

      expect(discipline).toBeInstanceOf(DisciplineEntity);
      expect(discipline.code).toBeDefined();
      expect(discipline.name).toBeDefined();
    });

    it('should create multiple disciplines when count > 1', () => {
      const count = 2;
      const faker = DisciplineFakeBuilder.theDisciplines(count);
      const disciplines = faker.build();

      expect(disciplines).toHaveLength(count);
      expect(disciplines[0]).toBeInstanceOf(DisciplineEntity);
      expect(disciplines[1]).toBeInstanceOf(DisciplineEntity);
      expect(disciplines[0].code).not.toBe(disciplines[1].code);
    });
  });
});
