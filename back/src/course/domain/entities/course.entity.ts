import { Entity } from '@/shared/domain/entities/entity';
import { CourseValidatorFactory } from '@/shared/domain/validators/course.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';
import { CourseFakeBuilder } from '@/course/domain/fake-builder/course-fake.builder';

export type CourseProps = {
  code: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class CourseEntity extends Entity<CourseProps> {
  constructor(
    public readonly props: CourseProps,
    id?: string,
  ) {
    CourseEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get code(): string {
    return this.props.code;
  }

  get name(): string {
    return this.props.name;
  }

  private set code(value: string) {
    this.props.code = value;
  }

  private set name(value: string) {
    this.props.name = value;
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

  static validate(props: CourseProps) {
    const validator = CourseValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  static fake(): typeof CourseFakeBuilder {
    return CourseFakeBuilder;
  }
}
