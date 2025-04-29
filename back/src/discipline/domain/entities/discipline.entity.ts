import { Entity } from '@/shared/domain/entities/entity';
import { DisciplineValidatorFactory } from '@/discipline/domain/validators/discipline.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';
import { DisciplineFakeBuilder } from '../fake-builder/discipline-fake.builder';
import { FieldsErrors } from '@/shared/domain/entities/validators/validator-fields.interface';

export type DisciplineProps = {
  name: string;
  code: string;
  courseId: string;
  coursePeriodId: string;
  createdAt?: Date;
  updatedAt?: Date;
  course?: any;
  coursePeriod?: any;
  schedules?: any[];
};

export class DisciplineEntity extends Entity<DisciplineProps> {
  constructor(
    public readonly props: DisciplineProps,
    id?: string,
  ) {
    DisciplineEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }
  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get code(): string {
    return this.props.code;
  }

  set code(code: string) {
    this.props.code = code;
  }

  get courseId(): string {
    return this.props.courseId;
  }

  set courseId(courseId: string) {
    this.props.courseId = courseId;
  }

  get coursePeriodId(): string {
    return this.props.coursePeriodId;
  }

  set coursePeriodId(coursePeriodId: string) {
    this.props.coursePeriodId = coursePeriodId;
  }

  get course() {
    return this.props.course;
  }

  get coursePeriod() {
    return this.props.coursePeriod;
  }

  get schedules() {
    return this.props.schedules;
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

  static validate(props: DisciplineProps) {
    const validator = DisciplineValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(
        Object.entries(validator.errors).reduce((acc, [field, messages]) => {
          acc[field] = messages;
          return acc;
        }, {} as FieldsErrors),
      );
    }
  }

  static fake() {
    return DisciplineFakeBuilder;
  }

  toPrismaJSON() {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      courseId: this.courseId,
      coursePeriodId: this.coursePeriodId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      courseId: this.courseId,
      coursePeriodId: this.coursePeriodId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ...(this.course && {
        course: {
          id: this.course.id,
          name: this.course.name,
        },
      }),
      ...(this.coursePeriod && {
        coursePeriod: {
          id: this.coursePeriod.id,
        },
      }),
      ...(this.schedules && {
        schedules: this.schedules.map((schedule) => ({
          id: schedule.id,
        })),
      }),
    };
  }
}
