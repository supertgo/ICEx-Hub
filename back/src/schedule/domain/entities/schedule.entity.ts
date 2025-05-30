import { Entity } from '@/shared/domain/entities/entity';
import { ScheduleValidatorFactory } from '@/schedule/domain/validators/schedule.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { DayPatternEnum, TimeSlotEnum } from '../schedule.constants';
import { ScheduleFakeBuilder } from '../fake-builder/schedule-fake.builder';

export type DisciplineProps = {
  id: string;
  name: string;
  code: string;
  courseId: string;
  coursePeriodId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ScheduleProps = {
  disciplineId: string;
  discipline?: DisciplineProps;
  classroomId: string;
  classroom?: ClassroomEntity | null;
  dayPattern: DayPatternEnum;
  timeSlot: TimeSlotEnum;
  class?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class ScheduleEntity extends Entity<ScheduleProps> {
  constructor(
    public readonly props: ScheduleProps,
    id?: string,
  ) {
    ScheduleEntity.validate(props);
    super(props, id);
    this.props.classroom = props.classroom;
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get disciplineId() {
    return this.props.disciplineId;
  }

  set disciplineId(disciplineId: string) {
    this.props.disciplineId = disciplineId;
  }

  get discipline() {
    return this.props.discipline;
  }

  get classroomId() {
    return this.props.classroomId;
  }

  set classroomId(classroomId: string) {
    this.props.classroomId = classroomId;
    this.updatedAt = new Date();
  }

  get classroom() {
    return this.props.classroom;
  }

  get dayPattern() {
    return this.props.dayPattern;
  }

  set dayPattern(dayPattern: DayPatternEnum) {
    this.props.dayPattern = dayPattern;
  }

  get timeSlot() {
    return this.props.timeSlot;
  }

  set timeSlot(timeSlot: TimeSlotEnum) {
    this.props.timeSlot = timeSlot;
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

  get class(): string {
    return this.props.class;
  }

  private set class(value: string) {
    this.props.class = value;
  }

  static validate(props: ScheduleProps) {
    const validator = ScheduleValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  static fake() {
    return ScheduleFakeBuilder;
  }

  //@ts-expect-error classroom, discipline
  toJSON() {
    return {
      id: this.id,
      classroom: {
        id: this.classroom?.id,
        name: this.classroom?.name,
        building: this.classroom?.building,
        createdAt: this.classroom?.createdAt,
      },
      discipline: {
        id: this.discipline?.id,
        name: this.discipline?.name,
        code: this.discipline?.code,
        courseId: this.discipline?.courseId,
        coursePeriodId: this.discipline?.coursePeriodId,
      },
      dayPattern: this.dayPattern,
      timeSlot: this.timeSlot,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      class: this.class,
    };
  }
}
