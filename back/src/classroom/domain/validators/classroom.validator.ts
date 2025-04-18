import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  CLASSROOM_BUILDING,
  CLASSROOM_MAX_LENGTHS,
} from '../classroom.constants';
import { ClassroomProps } from '../entities/classroom.entity';
import { ClassValidatorFields } from '@/shared/domain/entities/validators/class-validator-fields';

export class ClassroomRules {
  @MaxLength(CLASSROOM_MAX_LENGTHS.NAME)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsEnum(CLASSROOM_BUILDING)
  building: CLASSROOM_BUILDING;

  constructor(data: ClassroomProps) {
    Object.assign(this, data);
  }
}

export class ClassroomValidator extends ClassValidatorFields<ClassroomRules> {
  validate(data: ClassroomProps): boolean {
    return super.validate(new ClassroomRules(data));
  }
}

export class ClassroomValidatorFactory {
  static create(): ClassroomValidator {
    return new ClassroomValidator();
  }
}
