import { Entity } from '@/shared/domain/entities/entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';
import { ClassroomFakeBuilder } from '../fake-builder/classroom-fake.builder';
import { ClassroomValidatorFactory } from '../validators/classroom.validator';

export enum CLASSROOM_BUILDING {
  CAD3 = 'CAD3',
  ICEX = 'ICEX',
}

export type ClassroomProps = {
  name: string;
  building: CLASSROOM_BUILDING;
  createdAt?: Date;
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
    this.building = building;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  //TODO feat/update-classroom | Create update method here -> only id is required, should update name or building

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
