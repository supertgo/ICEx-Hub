/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropOrFactory } from '@/shared/domain/common';
import { DisciplineEntity } from '../entities/discipline.entity';
import { Faker, faker } from '@faker-js/faker';

export class DisciplineFakeBuilder<TBuild = any> {
  private _name: PropOrFactory<string> = (_index) => this.faker.word.words();

  private _createdAt: PropOrFactory<Date> | undefined = undefined;

  private _updatedAt: PropOrFactory<Date> | undefined = undefined;

  private _code: PropOrFactory<string> = (_index) =>
    this.faker.string.alpha(6).toUpperCase();

  private _courseId: PropOrFactory<string> = (_index) =>
    this.faker.string.uuid();

  private _coursePeriodId: PropOrFactory<string> = (_index) =>
    this.faker.string.uuid();

  private countObjs: number;

  private faker: Faker;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.faker = faker;
  }

  static theDisciplines(countObjs: number) {
    return new DisciplineFakeBuilder<DisciplineEntity[]>(countObjs);
  }

  static aDiscipline() {
    return new DisciplineFakeBuilder<DisciplineEntity>();
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withCode(valueOrFactory: PropOrFactory<string>) {
    this._code = valueOrFactory;
    return this;
  }

  withCourseId(valueOrFactory: PropOrFactory<string>) {
    this._courseId = valueOrFactory;
    return this;
  }

  withCoursePeriodId(valueOrFactory: PropOrFactory<string>) {
    this._coursePeriodId = valueOrFactory;
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

  withInvalidCodeEmpty() {
    this._code = '';
    return this;
  }

  withInvalidCodeTooLong(value?: string) {
    this._code = value ?? this.faker.string.alphanumeric(21);
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

  build(): TBuild extends DisciplineEntity[]
    ? DisciplineEntity[]
    : DisciplineEntity {
    const disciplines = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        return new DisciplineEntity({
          name: this.callFactory(this._name, index),
          code: this.callFactory(this._code, index),
          courseId: this.callFactory(this._courseId, index),
          coursePeriodId: this.callFactory(this._coursePeriodId, index),
          ...(this._createdAt && {
            createdAt: this.callFactory(this._createdAt, index),
          }),
          ...(this._updatedAt && {
            updatedAt: this.callFactory(this._updatedAt, index),
          }),
        });
      });

    return (this.countObjs === 1 ? disciplines[0] : disciplines) as any;
  }

  get name() {
    return this.getValue('name');
  }

  get code() {
    return this.getValue('code');
  }

  get courseId() {
    return this.getValue('courseId');
  }

  get coursePeriodId() {
    return this.getValue('coursePeriodId');
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
