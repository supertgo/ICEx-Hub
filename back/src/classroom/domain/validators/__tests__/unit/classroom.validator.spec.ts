import {
  CLASSROOM_BUILDING,
  CLASSROOM_MAX_LENGTHS,
} from '@/classroom/domain/classroom.constants';
import {
  ClassroomValidator,
  ClassroomValidatorFactory,
} from '../../classroom.validator';

let sut: ClassroomValidator;

describe('ClassroomValidatorFields Unit Tests', () => {
  beforeEach(() => {
    sut = ClassroomValidatorFactory.create();
  });

  describe('name validator', () => {
    it('should return true when a name is valid', () => {
      const isValid = sut.validate({
        name: '211',
        building: CLASSROOM_BUILDING.ICEX,
      });

      expect(isValid).toBe(true);
      expect(sut.errors).toBeNull();
      expect(sut.validatedData.name).toStrictEqual('211');
    });
  });

  it('should validate without data', () => {
    const isValid = sut.validate(null);

    expect(isValid).toBeFalsy();
    expect(sut.errors).toBeDefined();
    expect(sut.errors['name']).toStrictEqual([
      'name should not be empty',
      'name must be a string',
      `name must be shorter than or equal to ${CLASSROOM_MAX_LENGTHS.NAME} characters`,
    ]);
  });

  it('should validate name empty string', () => {
    const isValid = sut.validate({
      building: CLASSROOM_BUILDING.ICEX,
      name: '',
    });

    expect(isValid).toBeFalsy();
    expect(sut.errors).toBeDefined();
    expect(sut.errors['name']).toStrictEqual(['name should not be empty']);
  });

  it(`Should validate name being greater than ${CLASSROOM_MAX_LENGTHS.NAME}`, () => {
    const isValid = sut.validate({
      building: CLASSROOM_BUILDING.ICEX,
      name: 'a'.repeat(CLASSROOM_MAX_LENGTHS.NAME + 1),
    });

    expect(isValid).toBeFalsy();
    expect(sut.errors).toBeDefined();
    expect(sut.errors['name']).toStrictEqual([
      `name must be shorter than or equal to ${CLASSROOM_MAX_LENGTHS.NAME} characters`,
    ]);
  });
});
