/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropOrFactory } from '@/shared/domain/common';
import { ScheduleEntity } from '../entities/schedule.entity';
import { Faker, faker } from '@faker-js/faker';

export class ScheduleFakeBuilder<TBuild = any> {
  private _name: PropOrFactory<string> = (_index) => this.faker.word.words();

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

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
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

  build(): TBuild {
    const schedules = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        return new ScheduleEntity({
          name: this.callFactory(this._name, index),
          ...(this._createdAt && {
            createdAt: this.callFactory(this._createdAt, index),
          }),
          ...(this._updatedAt && {
            updatedAt: this.callFactory(this._updatedAt, index),
          }),
        });
      });

    return this.countObjs === 1 ? (schedules[0] as any) : schedules;
  }

  get name() {
    return this.getValue('name');
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
