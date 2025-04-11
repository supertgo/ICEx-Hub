import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/entities/validators/class-validator-fields';
import { ScheduleProps } from '@/schedule/domain/entities/schedule.entity';
import { DayPatternEnum, TimeSlotEnum } from '../schedule.constants';

class ScheduleRules {
  @IsUUID()
  @IsNotEmpty()
  disciplineId: string;

  @IsUUID()
  @IsNotEmpty()
  classroomId: string;

  @IsEnum(DayPatternEnum)
  @IsNotEmpty()
  dayPattern: DayPatternEnum;

  @IsEnum(TimeSlotEnum)
  @IsNotEmpty()
  timeSlot: TimeSlotEnum;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  constructor(data: ScheduleProps) {
    Object.assign(this, data);
  }
}

export class ScheduleValidator extends ClassValidatorFields<ScheduleRules> {
  validate(data: ScheduleProps): boolean {
    return super.validate(new ScheduleRules(data));
  }
}

export class ScheduleValidatorFactory {
  static create(): ScheduleValidator {
    return new ScheduleValidator();
  }
}
