/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropOrFactory } from '@/shared/domain/common';
import { ScheduleEntity } from '../entities/schedule.entity';
import { Faker, faker } from '@faker-js/faker';
import { DayPatternEnum, TimeSlotEnum } from '../schedule.constants';

export class ScheduleFakeBuilder<TBuild = any> {
  private _discplineId: PropOrFactory<string> = (_index) =>
    this.faker.string.uuid();

  private _classroomId: PropOrFactory<string> = (_index) =>
    this.faker.string.uuid();

  private _dayPattern: PropOrFactory<DayPatternEnum> = (_index) =>
    DayPatternEnum.TUESDAY_THURSDAY;

  private _timeSlot: PropOrFactory<TimeSlotEnum> = (_index) =>
    TimeSlotEnum.EVENING_2;

  private _createdAt: PropOrFactory<Date> | undefined = undefined;

  private _updatedAt: PropOrFactory<Date> | undefined = undefined;

  private countObjs: number;

  private faker: Faker;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.faker = faker;
  }

  static theSchedules(countObjs: number) {
    return new ScheduleFakeBuilder<ScheduleEntity[]>(countObjs);
  }

  static aSchedule() {
    return new ScheduleFakeBuilder<ScheduleEntity>();
  }

  withClasroomId(valueOrFactory: PropOrFactory<string>) {
    this._classroomId = valueOrFactory;

    return this;
  }

  withDisciplineId(valueOrFactory: PropOrFactory<string>) {
    this._discplineId = valueOrFactory;

    return this;
  }

  withDayPattern(valueOrFactory: PropOrFactory<DayPatternEnum>) {
    this._dayPattern = valueOrFactory;

    return this;
  }

  withTimeSlot(valueOrFactory: PropOrFactory<TimeSlotEnum>) {
    this._timeSlot = valueOrFactory;

    return this;
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._createdAt = valueOrFactory;
    return this;
  }

  withUpdatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._updatedAt = valueOrFactory;
    return this;
  }

  build(): TBuild extends ScheduleEntity[] ? ScheduleEntity[] : ScheduleEntity {
    const schedules = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        return new ScheduleEntity({
          classroomId: this.callFactory(this._classroomId, index),
          disciplineId: this.callFactory(this._discplineId, index),
          dayPattern: this.callFactory(this._dayPattern, index),
          timeSlot: this.callFactory(this._timeSlot, index),
          ...(this._createdAt && {
            createdAt: this.callFactory(this._createdAt, index),
          }),
          ...(this._updatedAt && {
            updatedAt: this.callFactory(this._updatedAt, index),
          }),
        });
      });

    return (this.countObjs === 1 ? schedules[0] : schedules) as any;
  }

  get discplineId() {
    return this.getValue('discplineId');
  }

  get classroomId() {
    return this.getValue('classroomId');
  }

  get dayPattern() {
    return this.getValue('DayPattern');
  }

  get timeSlot() {
    return this.getValue('timeSlot');
  }

  get createdAt() {
    return this.getValue('createdAt');
  }

  get updatedAt() {
    return this.getValue('updatedAt');
  }

  private getValue(prop: any) {
    const optional = ['createdAt', 'updatedAt'];

    const privateProp = `_${prop}` as keyof this;

    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} does not have a factory, use 'with' methods`,
      );
    }

    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
