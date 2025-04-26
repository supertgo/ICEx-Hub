import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/entities/validators/class-validator-fields';
import { DisciplineProps } from '@/discipline/domain/entities/discipline.entity';

class DisciplineRules {
  constructor(data: DisciplineProps) {
  }
}

export class DisciplineValidator extends ClassValidatorFields<DisciplineRules> {
  validate(data: DisciplineProps): boolean {
    return super.validate(new DisciplineRules(data));
  }
}

export class DisciplineValidatorFactory {
  static create(): DisciplineValidator {
    return new DisciplineValidator();
  }
}
