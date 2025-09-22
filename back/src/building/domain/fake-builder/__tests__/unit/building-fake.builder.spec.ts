import { BuildingEntity } from '@/building/domain/entities/building.entity';
import { BuildingFakeBuilder } from '@/building/domain/fake-builder/building-fake.builder';

describe('BuildingFakeBuilder Unit Tests', () => {
  describe('code prop', () => {
    const faker = BuildingFakeBuilder.aBuilding();

    it('_code should be a function', () => {
      expect(typeof faker['_code']).toBe('function');
    });


  describe('name prop', () => {
    const faker = BuildingFakeBuilder.aBuilding();

    it('_name should be a function', () => {
      expect(typeof faker['_name']).toBe('function');
    });

    it('withName()', () => {
      const buildingName = 'Introduction to Programming';
      const $this = faker.withName(buildingName);

      expect($this).toBeInstanceOf(BuildingFakeBuilder);
      expect(faker['_name']).toBe(buildingName);

      faker.withName(() => buildingName);

      //@ts-expect-error name is callable
      expect(faker['_name']()).toBe(buildingName);

      expect(faker.name).toBe(buildingName);
    });

    it('should pass index to name factory', () => {
      faker.withName((index) => `Building ${index}`);
      const building = faker.build();

      expect(building.name).toBe('Building 0');

      const fakerMany = BuildingFakeBuilder.theBuildings(2);
      fakerMany.withName((index) => `Building ${index}`);

      const buildings = fakerMany.build();

      expect(buildings[0].name).toBe('Building 0');
      expect(buildings[1].name).toBe('Building 1');
    });

  describe('createdAt prop', () => {
    const faker = BuildingFakeBuilder.aBuilding();

    test('should throw error when any with methods has been called', () => {
      const fakerBuilding = BuildingFakeBuilder.aBuilding();

      expect(() => fakerBuilding.createdAt).toThrow(
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

      expect($this).toBeInstanceOf(BuildingFakeBuilder);
      expect(faker['_createdAt']).toBe(date);

      faker.withCreatedAt(() => date);

      //@ts-expect-error _createdAt is a callable
      expect(faker['_createdAt']()).toBe(date);
      expect(faker.createdAt).toBe(date);
    });

    test('should pass index to createdAt factory', () => {
      const date = new Date();
      faker.withCreatedAt((index) => new Date(date.getTime() + index + 2));

      const building = faker.build();
      expect(building.createdAt.getTime()).toBe(date.getTime() + 2);

      const fakerMany = BuildingFakeBuilder.theBuildings(2);
      fakerMany.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const buildings = fakerMany.build();

      expect(buildings[0].createdAt.getTime()).toBe(date.getTime() + 2);
      expect(buildings[1].createdAt.getTime()).toBe(date.getTime() + 3);
    });
  });

  describe('updatedAt prop', () => {
    const faker = BuildingFakeBuilder.aBuilding();

    test('should throw error when any with methods has been called', () => {
      const fakerBuilding = BuildingFakeBuilder.aBuilding();

      expect(() => fakerBuilding.updatedAt).toThrow(
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

      expect($this).toBeInstanceOf(BuildingFakeBuilder);
      expect(faker['_updatedAt']).toBe(date);

      faker.withUpdatedAt(() => date);

      //@ts-expect-error _updatedAt is a callable
      expect(faker['_updatedAt']()).toBe(date);
      expect(faker.updatedAt).toBe(date);
    });

    test('should pass index to updatedAt factory', () => {
      const date = new Date();
      faker.withUpdatedAt((index) => new Date(date.getTime() + index + 2));

      const building = faker.build();
      expect(building.updatedAt.getTime()).toBe(date.getTime() + 2);

      const fakerMany = BuildingFakeBuilder.theBuildings(2);
      fakerMany.withUpdatedAt((index) => new Date(date.getTime() + index + 2));
      const buildings = fakerMany.build();

      expect(buildings[0].updatedAt.getTime()).toBe(date.getTime() + 2);
      expect(buildings[1].updatedAt.getTime()).toBe(date.getTime() + 3);
    });
  });

  describe('build() method', () => {
    it('should create a single building when count = 1', () => {
      const faker = BuildingFakeBuilder.aBuilding();
      const building = faker.build();

      expect(building).toBeInstanceOf(BuildingEntity);
      expect(building.code).toBeDefined();
      expect(building.name).toBeDefined();
    });

    it('should create multiple buildings when count > 1', () => {
      const count = 2;
      const faker = BuildingFakeBuilder.theBuildings(count);
      const buildings = faker.build();

      expect(buildings).toHaveLength(count);
      expect(buildings[0]).toBeInstanceOf(BuildingEntity);
      expect(buildings[1]).toBeInstanceOf(BuildingEntity);
      expect(buildings[0].code).not.toBe(buildings[1].code);
    });
  });
});
