/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropOrFactory } from '@/shared/domain/common';
import { CourseEntity } from '../entities/course.entity';
import { Faker } from '@faker-js/faker';
import { faker } from '@faker-js/faker/locale/hr';

export class CourseFakeBuilder<TBuild = any> {
  private _code: PropOrFactory<string> = (_index) =>
    this.faker.string.alphanumeric(6).toUpperCase();

  private _name: PropOrFactory<string> = (_index) => this.faker.word.words();

  private _createdAt: PropOrFactory<Date> | undefined = undefined;

  private _updatedAt: PropOrFactory<Date> | undefined = undefined;

  private countObjs: number;

  private faker: Faker;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.faker = faker;
  }

  static theCourses(countObjs: number) {
    return new CourseFakeBuilder<CourseEntity[]>(countObjs);
  }

  static aCourse() {
    return new CourseFakeBuilder<CourseEntity>();
  }

  withCode(valueOrFactory: PropOrFactory<string>) {
    this._code = valueOrFactory;
    return this;
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

  build(): TBuild {
    const courses = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        return new CourseEntity({
          code: this.callFactory(this._code, index),
          name: this.callFactory(this._name, index),
          ...(this._createdAt && {
            createdAt: this.callFactory(this._createdAt, index),
          }),
          ...(this._updatedAt && {
            updatedAt: this.callFactory(this._updatedAt, index),
          }),
        });
      });

    return this.countObjs === 1 ? (courses[0] as any) : courses;
  }

  get code() {
    return this.getValue('code');
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
