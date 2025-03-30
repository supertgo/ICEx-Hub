import { ClassroomFakeBuilder } from '../../classroom-fake.builder';
import {
  CLASSROOM_BUILDING,
  CLASSROOM_MAX_LENGTHS,
} from '@/classroom/domain/classroom.constants';

describe('ClassroomFakeBuilder Unit Tests', () => {
  describe('name prop', () => {
    const faker = ClassroomFakeBuilder.aIcexClassroom();

    it('_name should be a function', () => {
      expect(typeof faker['_name']).toBe('function');
    });

    it('withName()', () => {
      const classroomName = '2036';
      const $this = faker.withName(classroomName);

      expect($this).toBeInstanceOf(ClassroomFakeBuilder);
      expect(faker['_name']).toBe(classroomName);

      faker.withName(() => classroomName);

      //@ts-expect-error name is callable
      expect(faker['_name']()).toBe(classroomName);

      expect(faker.name).toBe(classroomName);
    });

    it('should pass index to name factory', () => {
      faker.withName((index) => `test name ${index}`);
      const classroom = faker.build();

      expect(classroom.name).toBe('test name 0');

      const fakerMany = ClassroomFakeBuilder.theClassroomEntitys(2);
      fakerMany.withName((index) => `test name ${index}`);

      const classrooms = fakerMany.build();

      expect(classrooms[0].name).toBe('test name 0');
      expect(classrooms[1].name).toBe('test name 1');
    });

    it('withInvalidNameTooLong()', () => {
      const $this = faker.withInvalidNameTooLong();

      expect($this).toBeInstanceOf(ClassroomFakeBuilder);
      expect(faker['_name'].length).toBeGreaterThanOrEqual(
        CLASSROOM_MAX_LENGTHS.NAME + 1,
      );

      const nameToLong = 't'.repeat(CLASSROOM_MAX_LENGTHS.NAME + 1);
      faker.withInvalidNameTooLong(nameToLong);

      expect(faker['_name'].length).toBeGreaterThanOrEqual(
        CLASSROOM_MAX_LENGTHS.NAME + 1,
      );
      expect(faker['_name']).toBe(nameToLong);
    });
  });

  describe('building prop', () => {
    test('withBuilding()', () => {
      const fakerICEXclassroom = ClassroomFakeBuilder.aIcexClassroom();

      expect(fakerICEXclassroom.building).toBe(CLASSROOM_BUILDING.ICEX);

      fakerICEXclassroom.withCADBuilding();

      expect(fakerICEXclassroom.building).toBe(CLASSROOM_BUILDING.CAD3);

      const fakerCAD3Classroom = ClassroomFakeBuilder.aCADClassroom();

      expect(fakerCAD3Classroom.building).toBe(CLASSROOM_BUILDING.CAD3);

      fakerCAD3Classroom.withICEXBuilding();
      expect(fakerCAD3Classroom.building).toBe(CLASSROOM_BUILDING.ICEX);
    });
  });

  describe('createdAt prop', () => {
    const faker = ClassroomFakeBuilder.aCADClassroom();

    test('should throw error when any with methods has been called', () => {
      const fakerCastMember = ClassroomFakeBuilder.aCADClassroom();

      expect(() => fakerCastMember.createdAt).toThrow(
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

      expect($this).toBeInstanceOf(ClassroomFakeBuilder);
      expect(faker['_createdAt']).toBe(date);

      faker.withCreatedAt(() => date);

      //@ts-expect-error _created_at is a callable
      expect(faker['_createdAt']()).toBe(date);
      expect(faker.createdAt).toBe(date);
    });

    test('should pass index to created_at factory', () => {
      const date = new Date();
      faker.withCreatedAt((index) => new Date(date.getTime() + index + 2));

      const classroom = faker.build();
      expect(classroom.createdAt.getTime()).toBe(date.getTime() + 2);

      const fakerMany = ClassroomFakeBuilder.theCadClassrooms(2);

      fakerMany.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const classrooms = fakerMany.build();

      expect(classrooms[0].createdAt.getTime()).toBe(date.getTime() + 2);
      expect(classrooms[1].createdAt.getTime()).toBe(date.getTime() + 3);
    });
  });
});
