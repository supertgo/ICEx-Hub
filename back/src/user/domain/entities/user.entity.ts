import { Entity } from '@/shared/domain/entities/entity';
import { UserValidatorFactory } from '@/shared/domain/validators/user.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  courseId?: string;
  coursePeriodId?: string;
  createdAt?: Date;
};

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(value: string) {
    UserEntity.validate({ ...this.props, name: value });
    this.name = value;
  }

  updatePassword(value: string) {
    UserEntity.validate({ ...this.props, password: value });
    this.password = value;
  }

  get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get courseId(): string | undefined {
    return this.props.courseId;
  }

  private set courseId(value: string | undefined) {
    this.props.courseId = value;
  }

  get coursePeriodId(): string | undefined {
    return this.props.coursePeriodId;
  }

  private set coursePeriodId(value: string | undefined) {
    this.props.coursePeriodId = value;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
