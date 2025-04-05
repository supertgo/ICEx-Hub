import {
  CourseValidator,
  CourseValidatorFactory,
} from '@/shared/domain/validators/course.validator';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';

let sut: CourseValidator;

describe('CourseValidator Unit Tests', () => {
  beforeEach(() => {
    sut = CourseValidatorFactory.create();
  });

  describe('name validation', () => {
    it('should return true with valid name', () => {
      const data = CourseDataBuilder({});
      const isValid = sut.validate(data);

      expect(isValid).toBeTruthy();
      expect(sut.errors).toBeNull();
      expect(sut.validatedData.name).toStrictEqual(data.name);
    });

    it('Should validate without data', () => {
      const isValid = sut.validate({} as any);

      expect(isValid).toBeFalsy();
      expect(sut.errors).toBeDefined();
      expect(sut.errors['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);
    });

    it('Should validate name being null', () => {
      const isValid = sut.validate({ ...CourseDataBuilder({}), name: null });

      expect(isValid).toBeFalsy();
      expect(sut.errors).toBeDefined();
      expect(sut.errors['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);
    });

    it('Should validate name empty string', () => {
      const isValid = sut.validate({ ...CourseDataBuilder({}), name: '' });

      expect(isValid).toBeFalsy();
      expect(sut.errors).toBeDefined();
      expect(sut.errors['name']).toStrictEqual(['name should not be empty']);
    });

    it('Should validate name being date instead of string', () => {
      const isValid = sut.validate({
        ...CourseDataBuilder({}),
        name: new Date() as any,
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors).toBeDefined();
      expect(sut.errors['name']).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);
    });

    it('Should validate name being greater than 255', () => {
      const isValid = sut.validate({
        ...CourseDataBuilder({}),
        name: 'a'.repeat(256),
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors).toBeDefined();
      expect(sut.errors['name']).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ]);
    });
  });

  describe('code validation', () => {
    it('should return true with valid code', () => {
      const data = CourseDataBuilder({});
      const isValid = sut.validate(data);

      expect(isValid).toBeTruthy();
      expect(sut.errors).toBeNull();
      expect(sut.validatedData.code).toStrictEqual(data.code);
    });

    it('Should validate without data', () => {
      const isValid = sut.validate({} as any);

      expect(isValid).toBeFalsy();
      expect(sut.errors).toBeDefined();
      expect(sut.errors['code']).toStrictEqual([
        'code must be a string',
        'code should not be empty',
        'code must be shorter than or equal to 255 characters',
      ]);
    });

    it('Should validate code being null', () => {
      const isValid = sut.validate({ ...CourseDataBuilder({}), code: null });

      expect(isValid).toBeFalsy();
      expect(sut.errors).toBeDefined();
      expect(sut.errors['code']).toStrictEqual([
        'code must be a string',
        'code should not be empty',
        'code must be shorter than or equal to 255 characters',
      ]);
    });

    it('Should validate code empty string', () => {
      const isValid = sut.validate({ ...CourseDataBuilder({}), code: '' });

      expect(isValid).toBeFalsy();
      expect(sut.errors).toBeDefined();
      expect(sut.errors['code']).toStrictEqual(['code should not be empty']);
    });

    it('Should validate code being date instead of string', () => {
      const isValid = sut.validate({
        ...CourseDataBuilder({}),
        code: new Date() as any,
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors).toBeDefined();
      expect(sut.errors['code']).toStrictEqual([
        'code must be a string',
        'code must be shorter than or equal to 255 characters',
      ]);
    });

    it('Should validate code being greater than 255', () => {
      const isValid = sut.validate({
        ...CourseDataBuilder({}),
        code: 'a'.repeat(256),
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors).toBeDefined();
      expect(sut.errors['code']).toStrictEqual([
        'code must be shorter than or equal to 255 characters',
      ]);
    });
  });
});
