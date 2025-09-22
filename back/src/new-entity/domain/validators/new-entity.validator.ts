import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/entities/validators/class-validator-fields';
import { NewEntityProps } from '@/new-entity/domain/entities/new-entity.entity';

class NewEntityRules {
  constructor(data: NewEntityProps) {
  }
}

export class NewEntityValidator extends ClassValidatorFields<NewEntityRules> {
  validate(data: NewEntityProps): boolean {
    return super.validate(new NewEntityRules(data));
  }
}

export class NewEntityValidatorFactory {
  static create(): NewEntityValidator {
    return new NewEntityValidator();
  }
}
