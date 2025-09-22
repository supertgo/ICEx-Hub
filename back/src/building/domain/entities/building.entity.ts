import { Entity } from '@/shared/domain/entities/entity';
import { BuildingValidatorFactory } from '@/building/domain/validators/building.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';

export type BuildingProps = {
  createdAt?: Date;
  updatedAt?: Date;
};

export class BuildingEntity extends Entity<BuildingProps> {
  constructor(
    public readonly props: BuildingProps,
    id?: string,
  ) {
    BuildingEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static validate(props: BuildingProps) {
    const validator = BuildingValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
