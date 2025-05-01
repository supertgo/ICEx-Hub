import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import {
  DisciplineValidator,
  DisciplineValidatorFactory,
} from '../../discipline.validator';

let sut: DisciplineValidator;

describe('DisciplineValidatorFields Unit Tests', () => {
  beforeEach(() => {
    sut = DisciplineValidatorFactory.create();
  });

  it('should validate with valid data', () => {
    const isValid = sut.validate({
      name: 'Math',
      code: 'MATH123',
      courseId: '550e8400-e29b-41d4-a716-446655440000',
      coursePeriodId: '550e8400-e29b-41d4-a716-446655440001',
      createdAt: new Date(),
    });
    expect(isValid).toBe(true);
    expect(sut.errors).toBeNull();
  });

  it('should not validate when required fields are missing', () => {
    const validator = DisciplineValidatorFactory.create();
    const isValid = validator.validate({
      name: '',
      code: '',
      courseId: '',
      coursePeriodId: '',
    } as any);
    expect(isValid).toBe(false);
    expect(validator.errors).toEqual({
      name: ['name should not be empty'],
      code: ['code should not be empty'],
      courseId: ['courseId must be a UUID', 'courseId should not be empty'],
      coursePeriodId: [
        'coursePeriodId must be a UUID',
        'coursePeriodId should not be empty',
      ],
    });
  });

  it('should validate when optional fields are missing', () => {
    const validator = DisciplineValidatorFactory.create();
    const isValid = validator.validate({
      name: 'Math',
      code: 'MATH123',
      courseId: '550e8400-e29b-41d4-a716-446655440000',
      coursePeriodId: '550e8400-e29b-41d4-a716-446655440001',
    });
    expect(isValid).toBe(true);
    expect(validator.errors).toBeNull();
  });

  it('should not validate when fields exceed maximum length', () => {
    const validator = DisciplineValidatorFactory.create();
    const isValid = validator.validate({
      name: 'A'.repeat(256),
      code: 'A'.repeat(21),
      courseId: '550e8400-e29b-41d4-a716-446655440000',
      coursePeriodId: '550e8400-e29b-41d4-a716-446655440001',
    });
    expect(isValid).toBe(false);
    expect(validator.errors).toEqual({
      name: ['name must be shorter than or equal to 255 characters'],
      code: ['code must be shorter than or equal to 20 characters'],
    });
  });

  it('should not validate when fields are of incorrect type', () => {
    const validator = DisciplineValidatorFactory.create();
    const isValid = validator.validate({
      name: 123 as any,
      code: 456 as any,
      courseId: '550e8400-e29b-41d4-a716-446655440000',
      coursePeriodId: '550e8400-e29b-41d4-a716-446655440001',
    });
    expect(isValid).toBe(false);
    expect(validator.errors).toEqual({
      name: [
        'name must be shorter than or equal to 255 characters',
        'name must be a string',
      ],
      code: [
        'code must be shorter than or equal to 20 characters',
        'code must be a string',
      ],
    });
  });

  it('should throw an error when data is null', () => {
    const validator = DisciplineValidatorFactory.create();
    expect(() => validator.validate(null as any)).toThrowError(
      "Cannot read properties of null (reading 'name')",
    );
  });

  it('should throw an error when data is undefined', () => {
    const validator = DisciplineValidatorFactory.create();
    expect(() => validator.validate(undefined as any)).toThrowError(
      "Cannot read properties of undefined (reading 'name')",
    );
  });
});
