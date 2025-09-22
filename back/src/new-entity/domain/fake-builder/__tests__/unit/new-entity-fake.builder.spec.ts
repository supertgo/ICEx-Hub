import { NewEntityEntity } from '@/new-entity/domain/entities/new-entity.entity';
import { NewEntityFakeBuilder } from '@/new-entity/domain/fake-builder/new-entity-fake.builder';

describe('NewEntityFakeBuilder Unit Tests', () => {
  describe('code prop', () => {
    const faker = NewEntityFakeBuilder.aNewEntity();

    it('_code should be a function', () => {
      expect(typeof faker['_code']).toBe('function');
    });


  describe('name prop', () => {
    const faker = NewEntityFakeBuilder.aNewEntity();

    it('_name should be a function', () => {
      expect(typeof faker['_name']).toBe('function');
    });

    it('withName()', () => {
      const new-entityName = 'Introduction to Programming';
      const $this = faker.withName(new-entityName);

      expect($this).toBeInstanceOf(NewEntityFakeBuilder);
      expect(faker['_name']).toBe(new-entityName);

      faker.withName(() => new-entityName);

      //@ts-expect-error name is callable
      expect(faker['_name']()).toBe(new-entityName);

      expect(faker.name).toBe(new-entityName);
    });

    it('should pass index to name factory', () => {
      faker.withName((index) => `NewEntity ${index}`);
      const new-entity = faker.build();

      expect(new-entity.name).toBe('NewEntity 0');

      const fakerMany = NewEntityFakeBuilder.theNewEntitys(2);
      fakerMany.withName((index) => `NewEntity ${index}`);

      const new-entitys = fakerMany.build();

      expect(new-entitys[0].name).toBe('NewEntity 0');
      expect(new-entitys[1].name).toBe('NewEntity 1');
    });

  describe('createdAt prop', () => {
    const faker = NewEntityFakeBuilder.aNewEntity();

    test('should throw error when any with methods has been called', () => {
      const fakerNewEntity = NewEntityFakeBuilder.aNewEntity();

      expect(() => fakerNewEntity.createdAt).toThrow(
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

      expect($this).toBeInstanceOf(NewEntityFakeBuilder);
      expect(faker['_createdAt']).toBe(date);

      faker.withCreatedAt(() => date);

      //@ts-expect-error _createdAt is a callable
      expect(faker['_createdAt']()).toBe(date);
      expect(faker.createdAt).toBe(date);
    });

    test('should pass index to createdAt factory', () => {
      const date = new Date();
      faker.withCreatedAt((index) => new Date(date.getTime() + index + 2));

      const new-entity = faker.build();
      expect(new-entity.createdAt.getTime()).toBe(date.getTime() + 2);

      const fakerMany = NewEntityFakeBuilder.theNewEntitys(2);
      fakerMany.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const new-entitys = fakerMany.build();

      expect(new-entitys[0].createdAt.getTime()).toBe(date.getTime() + 2);
      expect(new-entitys[1].createdAt.getTime()).toBe(date.getTime() + 3);
    });
  });

  describe('updatedAt prop', () => {
    const faker = NewEntityFakeBuilder.aNewEntity();

    test('should throw error when any with methods has been called', () => {
      const fakerNewEntity = NewEntityFakeBuilder.aNewEntity();

      expect(() => fakerNewEntity.updatedAt).toThrow(
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

      expect($this).toBeInstanceOf(NewEntityFakeBuilder);
      expect(faker['_updatedAt']).toBe(date);

      faker.withUpdatedAt(() => date);

      //@ts-expect-error _updatedAt is a callable
      expect(faker['_updatedAt']()).toBe(date);
      expect(faker.updatedAt).toBe(date);
    });

    test('should pass index to updatedAt factory', () => {
      const date = new Date();
      faker.withUpdatedAt((index) => new Date(date.getTime() + index + 2));

      const new-entity = faker.build();
      expect(new-entity.updatedAt.getTime()).toBe(date.getTime() + 2);

      const fakerMany = NewEntityFakeBuilder.theNewEntitys(2);
      fakerMany.withUpdatedAt((index) => new Date(date.getTime() + index + 2));
      const new-entitys = fakerMany.build();

      expect(new-entitys[0].updatedAt.getTime()).toBe(date.getTime() + 2);
      expect(new-entitys[1].updatedAt.getTime()).toBe(date.getTime() + 3);
    });
  });

  describe('build() method', () => {
    it('should create a single new-entity when count = 1', () => {
      const faker = NewEntityFakeBuilder.aNewEntity();
      const new-entity = faker.build();

      expect(new-entity).toBeInstanceOf(NewEntityEntity);
      expect(new-entity.code).toBeDefined();
      expect(new-entity.name).toBeDefined();
    });

    it('should create multiple new-entitys when count > 1', () => {
      const count = 2;
      const faker = NewEntityFakeBuilder.theNewEntitys(count);
      const new-entitys = faker.build();

      expect(new-entitys).toHaveLength(count);
      expect(new-entitys[0]).toBeInstanceOf(NewEntityEntity);
      expect(new-entitys[1]).toBeInstanceOf(NewEntityEntity);
      expect(new-entitys[0].code).not.toBe(new-entitys[1].code);
    });
  });
});
