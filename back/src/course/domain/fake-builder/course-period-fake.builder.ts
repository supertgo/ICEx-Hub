/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropOrFactory } from '@/shared/domain/common';
import { Faker } from '@faker-js/faker';
import { faker } from '@faker-js/faker/locale/hr';
import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';

export class CoursePeriodFakeBuilder<TBuild = any> {
  private _name: PropOrFactory<string> = (_index) => this.faker.word.words();
  private _courseId: PropOrFactory<string> | undefined = undefined;
  private _createdAt: PropOrFactory<Date> | undefined = undefined;
  private _updatedAt: PropOrFactory<Date> | undefined = undefined;
  private countObjs: number;
  private faker: Faker;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.faker = faker;
  }

  static theCoursePeriods(countObjs: number) {
    return new CoursePeriodFakeBuilder<CoursePeriodEntity[]>(countObjs);
  }

  static aCoursePeriod() {
    return new CoursePeriodFakeBuilder<CoursePeriodEntity>();
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withCourseId(valueOrFactory: PropOrFactory<string>) {
    this._courseId = valueOrFactory;
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

  withInvalidNameEmpty() {
    this._name = '';
    return this;
  }

  withInvalidNameTooLong(value?: string) {
    this._name = value ?? this.faker.word.words(50);
    return this;
  }

  build(): TBuild extends CoursePeriodEntity[]
    ? CoursePeriodEntity[]
    : CoursePeriodEntity {
    const coursePeriods = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        return new CoursePeriodEntity({
          name: this.callFactory(this._name, index),
          courseId: this._courseId
            ? this.callFactory(this._courseId, index)
            : undefined,
          ...(this._createdAt && {
            createdAt: this.callFactory(this._createdAt, index),
          }),
          ...(this._updatedAt && {
            updatedAt: this.callFactory(this._updatedAt, index),
          }),
        });
      });

    return (this.countObjs === 1 ? coursePeriods[0] : coursePeriods) as any;
  }

  get name() {
    return this.getValue('name');
  }

  get courseId() {
    return this.getValue('courseId');
  }

  get createdAt() {
    return this.getValue('createdAt');
  }

  get updatedAt() {
    return this.getValue('updatedAt');
  }

  private getValue(prop: any) {
    const optional = ['createdAt', 'updatedAt', 'courseId'];

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
