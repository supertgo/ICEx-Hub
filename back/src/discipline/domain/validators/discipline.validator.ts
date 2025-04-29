import { IsNotEmpty, IsString, MaxLength, IsUUID } from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/entities/validators/class-validator-fields';
import { DisciplineProps } from '@/discipline/domain/entities/discipline.entity';

class DisciplineRules {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  code: string;

  @IsNotEmpty()
  @IsUUID()
  courseId: string;

  @IsNotEmpty()
  @IsUUID()
  coursePeriodId: string;

  constructor(data: DisciplineProps) {
    this.name = data.name;
    this.code = data.code;
    this.courseId = data.courseId;
    this.coursePeriodId = data.coursePeriodId;
  }
}

export class DisciplineValidator extends ClassValidatorFields<DisciplineRules> {
  validate(data: DisciplineProps): boolean {
    return super.validate(new DisciplineRules(data));
  }
}

export class DisciplineValidatorFactory {
  static create() {
    return new DisciplineValidator();
  }
}
