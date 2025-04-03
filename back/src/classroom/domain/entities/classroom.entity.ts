import { Entity } from '@/shared/domain/entities/entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';
import { ClassroomFakeBuilder } from '../fake-builder/classroom-fake.builder';
import { ClassroomValidatorFactory } from '../validators/classroom.validator';
import { CLASSROOM_BUILDING } from '../classroom.constants';

export type ClassroomProps = {
  name: string;
  building: CLASSROOM_BUILDING;
  createdAt?: Date;
  updatedAt?: Date;
};

export class ClassroomEntity extends Entity<ClassroomProps> {
  constructor(
    public readonly props: ClassroomProps,
    id?: string,
  ) {
    ClassroomEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get building(): CLASSROOM_BUILDING {
    return this.props.building;
  }

  private set building(building: CLASSROOM_BUILDING) {
    this.props.building = building;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateBuilding(building: CLASSROOM_BUILDING) {
    ClassroomEntity.validate({
      ...this.props,
      name: this.name,
      building: building,
    });
    this.building = building;
    this.props.updatedAt = new Date();
  }

  updateName(name: string) {
    ClassroomEntity.validate({
      ...this.props,
      name: name,
      building: this.building,
    });
    this.name = name;
    this.props.updatedAt = new Date();
  }

  static validate(props: ClassroomProps) {
    const validator = ClassroomValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  static fake() {
    return ClassroomFakeBuilder;
  }
}
