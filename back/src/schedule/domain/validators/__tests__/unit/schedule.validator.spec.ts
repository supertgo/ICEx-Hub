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
      'timeSlot must be one of the following values:  7:30 - 9:10,  9:25 - 11:05,  11:10 - 12:00,  13:00 - 14:40,  14:55 - 16:35,  17:00 - 18:40,  19:00 - 20:40,  20:55 - 22:30',
    ]);
  });
});
