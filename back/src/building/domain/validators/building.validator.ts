import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/entities/validators/class-validator-fields';
import { BuildingProps } from '@/building/domain/entities/building.entity';

class BuildingRules {
  constructor(data: BuildingProps) {
  }
}

export class BuildingValidator extends ClassValidatorFields<BuildingRules> {
  validate(data: BuildingProps): boolean {
    return super.validate(new BuildingRules(data));
  }
}

export class BuildingValidatorFactory {
  static create(): BuildingValidator {
    return new BuildingValidator();
  }
}
