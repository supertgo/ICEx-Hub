import { Entity } from '@/shared/domain/entities/entity';
import { CoursePeriodValidatorFactory } from '@/shared/domain/validators/course-period.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';

export type CoursePeriodProps = {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  courseId?: string;
};

export class CoursePeriodEntity extends Entity<CoursePeriodProps> {
  constructor(
    public readonly props: CoursePeriodProps,
    id?: string,
  ) {
    CoursePeriodEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  private set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  private set updatedAt(value: Date) {
    this.props.updatedAt = value;
  }

  get courseId(): string | undefined {
    return this.props.courseId;
  }

  private set courseId(value: string) {
    this.props.courseId = value;
  }

  static validate(props: CoursePeriodProps) {
    const validator = CoursePeriodValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  // static fake(): typeof CoursePeriodFakeBuilder {
  //   return CoursePeriodFakeBuilder;
  // }
}
