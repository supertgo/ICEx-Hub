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

  @IsNotEmpty()
  createdAt: Date;

  constructor(data: DisciplineProps) {
    Object.assign(this, data);
  }
}

export class DisciplineValidator extends ClassValidatorFields<DisciplineRules> {
  validate(data: DisciplineProps): boolean {
    return super.validate(new DisciplineRules(data));
  }
}

export class DisciplineValidatorFactory {
  static create() {
    return {
      validate(props: DisciplineProps): boolean {
        const errors: string[] = [];

        if (!props.name || props.name.trim().length === 0) {
          errors.push('Name is required');
        }

        if (!props.code || props.code.trim().length === 0) {
          errors.push('Code is required');
        }

        if (!props.courseId || props.courseId.trim().length === 0) {
          errors.push('CourseId is required');
        }

        if (!props.coursePeriodId || props.coursePeriodId.trim().length === 0) {
          errors.push('CoursePeriodId is required');
        }

        this.errors = errors;
        return errors.length === 0;
      },
      errors: [] as string[],
    };
  }
}
