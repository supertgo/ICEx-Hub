import { TimeSlotEnum } from '@/schedule/domain/schedule.constants';
import { isEnumValue, validateEnumArray } from '../common';
import { BadRequestException } from '@nestjs/common';

describe('isEnumValue()', () => {
  it('should return true if value is in enum', () => {
    expect(isEnumValue(TimeSlotEnum, 'MORNING_1')).toBe(true);
    expect(isEnumValue(TimeSlotEnum, 'MORNING_2')).toBe(true);
    expect(isEnumValue(TimeSlotEnum, 'MORNING_3')).toBe(true);
  });

  it('should return false if value is not in enum', () => {
    expect(isEnumValue(TimeSlotEnum, 'NOT_IN_ENUM')).toBe(false);
    expect(isEnumValue(TimeSlotEnum, 'evening_1')).toBe(false);
  });
});

describe('validateEnumArray()', () => {
  it('should convert a single string in array and not throw error', () => {
    expect(
      validateEnumArray('MORNING_1', TimeSlotEnum, 'TimeSlotEnum'),
    ).toStrictEqual(['MORNING_1']);
  });

  it('should receive an array and return all as valid', () => {
    expect(
      validateEnumArray(
        ['MORNING_1', 'MORNING_2', 'MORNING_3'],
        TimeSlotEnum,
        'TimeSlotEnum',
      ),
    ).toStrictEqual(['MORNING_1', 'MORNING_2', 'MORNING_3']);
  });

  it('should throw BadRequestException error with the invalid enum values and valida ones', () => {
    enum TestValidateEnumArray {
      TEST = 'TEST',
      VALIDATE = 'VALIDATE',
    }

    expect(() =>
      validateEnumArray(
        ['MORNING_1', 'MORNING_2'],
        TestValidateEnumArray,
        'validateEnumArray',
      ),
    ).toThrow(
      new BadRequestException(
        'Invalid validateEnumArray value(s): MORNING_1, MORNING_2. Valid values: TEST, VALIDATE',
      ),
    );
  });
});
