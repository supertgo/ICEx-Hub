import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';
import {
  CoursePeriodValidator,
  CoursePeriodValidatorFactory,
} from '@/shared/domain/validators/course-period.validator';

let sut: CoursePeriodValidator;

describe('CoursePeriodValidator Unit Tests', () => {
  beforeEach(() => {
    sut = CoursePeriodValidatorFactory.create();
  });

  describe('name validation', () => {
    it('should return true with valid name', () => {
      const data = CourseDataBuilder({});
      const isValid = sut.validate(data);

      expect(isValid).toBeTruthy();
      expect(sut.errors).toBeNull();
      expect(sut.validatedData.name).toStrictEqual(data.name);
    });
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
