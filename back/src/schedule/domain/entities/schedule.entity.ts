import { Entity } from '@/shared/domain/entities/entity';
import { ScheduleValidatorFactory } from '@/schedule/domain/validators/schedule.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { DayPatternEnum, TimeSlotEnum } from '../schedule.constants';

type DisciplineProps = {
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

  static validate(props: ScheduleProps) {
    const validator = ScheduleValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  //@ts-expect-error classroom, discipline
  toJSON() {
    return {
      id: this.id,
      classroomId: this.classroomId,
      // classroom: {
      //   id: this.classroom.id,
      //   name: this.classroom.name,
      //   building: this.classroom.building,
      //   createdAt: this.classroom.createdAt,
      // },
      disciplineId: this.disciplineId,
      // discipline: {
      //   name: this.discipline.name,
      //   code: this.discipline.code,
      //   courseId: this.discipline.courseId,
      //   coursePeriodId: this.discipline.coursePeriodId,
      // },
      dayPattern: this.dayPattern,
      timeSlot: this.timeSlot,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
