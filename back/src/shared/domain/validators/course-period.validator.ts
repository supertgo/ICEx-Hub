import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/entities/validators/class-validator-fields';
import { CoursePeriodProps } from '@/course/domain/entities/course-period.entity';

class CoursePeriodRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(data: CoursePeriodProps) {
    this.name = data.name;
  }
}

export class CoursePeriodValidator extends ClassValidatorFields<CoursePeriodRules> {
  validate(data: CoursePeriodProps): boolean {
    return super.validate(new CoursePeriodRules(data));
  }
}

export class CoursePeriodValidatorFactory {
  static create(): CoursePeriodValidator {
    return new CoursePeriodValidator();
  }
}
