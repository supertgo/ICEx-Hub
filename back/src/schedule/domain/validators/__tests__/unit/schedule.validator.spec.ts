import {
  ScheduleValidator,
  ScheduleValidatorFactory,
} from '../../schedule.validator';

let sut: ScheduleValidator;

describe('ScheduleValidatorFields Unit Tests', () => {
  beforeEach(() => {
    sut = ScheduleValidatorFactory.create();
  });

  it('should validate without data', () => {
    const isValid = sut.validate(null);

    expect(isValid).toBeFalsy();
    expect(sut.errors).toBeDefined();
    expect(sut.errors['disciplineId']).toStrictEqual([
      'disciplineId should not be empty',
      'disciplineId must be a UUID',
    ]);

    expect(sut.errors['classroomId']).toStrictEqual([
      'classroomId should not be empty',
      'classroomId must be a UUID',
    ]);

    expect(sut.errors['dayPattern']).toStrictEqual([
      'dayPattern should not be empty',
      'dayPattern must be one of the following values: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, MONDAY_WEDNESDAY, TUESDAY_THURSDAY',
    ]);

    expect(sut.errors['timeSlot']).toStrictEqual([
      'timeSlot should not be empty',
      'timeSlot must be one of the following values: MORNING_1, MORNING_2, MORNING_3, AFTERNOON_1, AFTERNOON_2, EVENING_1, EVENING_2, EVENING_3',
    ]);
  });
});
