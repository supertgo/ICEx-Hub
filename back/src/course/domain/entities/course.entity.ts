import { Entity } from '@/shared/domain/entities/entity';
import { CourseValidatorFactory } from '@/shared/domain/validators/course.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';

export type CourseProps = {
  code: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class CourseEntity extends Entity<CourseProps> {
  constructor(
    public readonly props: CourseProps,
  ) {
    CourseEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static validate(props: CourseProps) {
    const validator = CourseValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
