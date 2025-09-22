import { Entity } from '@/shared/domain/entities/entity';
import { NewEntityValidatorFactory } from '@/new-entity/domain/validators/new-entity.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';

export type NewEntityProps = {
  createdAt?: Date;
  updatedAt?: Date;
};

export class NewEntityEntity extends Entity<NewEntityProps> {
  constructor(
    public readonly props: NewEntityProps,
    id?: string,
  ) {
    NewEntityEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static validate(props: NewEntityProps) {
    const validator = NewEntityValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
