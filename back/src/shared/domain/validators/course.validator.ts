import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/entities/validators/class-validator-fields';
import { CourseProps } from '@/course/domain/entities/course.entity';

class CourseRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  code: string;

  constructor(data: CourseProps) {
    this.name = data.name;
    this.code = data.code;
  }
}

export class CourseValidator extends ClassValidatorFields<CourseRules> {
  validate(data: CourseProps): boolean {
    return super.validate(new CourseRules(data));
  }
}

export class CourseValidatorFactory {
  static create(): CourseValidator {
    return new CourseValidator();
  }
}
