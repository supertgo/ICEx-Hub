/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropOrFactory } from '@/shared/domain/common';
import { ClassroomEntity } from '../entities/classroom.entity';
import { Faker } from '@faker-js/faker';
import {
  CLASSROOM_BUILDING,
  CLASSROOM_MAX_LENGTHS,
} from '../classroom.constants';
import { faker } from '@faker-js/faker/locale/hr';

export class ClassroomFakeBuilder<TBuild = any> {
  private _name: PropOrFactory<string> = (_index) => this.faker.word.words();

  private _createdAt: PropOrFactory<Date> | undefined = undefined;

  private _updatedAt: PropOrFactory<Date> | undefined = undefined;

  private _building: PropOrFactory<CLASSROOM_BUILDING> = (_index) =>
    CLASSROOM_BUILDING.ICEX;

  private countObjs: number;

  private faker: Faker;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.faker = faker;
  }

  static theIcexClassrooms(countObjs: number) {
    return new ClassroomFakeBuilder<ClassroomEntity[]>(countObjs).withBuilding(
      CLASSROOM_BUILDING.ICEX,
    );
  }

  static theCadClassrooms(countObjs: number) {
    return new ClassroomFakeBuilder<ClassroomEntity[]>(countObjs).withBuilding(
      CLASSROOM_BUILDING.CAD3,
    );
  }

  static theClassroomEntitys(countObjs: number) {
    return new ClassroomFakeBuilder<ClassroomEntity[]>(countObjs);
  }

  static aCADClassroom() {
    return new ClassroomFakeBuilder<ClassroomEntity>().withCADBuilding();
  }

  static aIcexClassroom() {
    return new ClassroomFakeBuilder<ClassroomEntity>().withICEXBuilding();
  }

  withBuilding(valueOrFactory: PropOrFactory<CLASSROOM_BUILDING>) {
    this._building = valueOrFactory;

    return this;
  }

  withICEXBuilding() {
    this._building = CLASSROOM_BUILDING.ICEX;

    return this;
  }

  withCADBuilding() {
    this._building = CLASSROOM_BUILDING.CAD3;

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

  withInvalidNameTooLong(value?: string) {
    this._name =
      value ?? this.faker.word.words({ count: CLASSROOM_MAX_LENGTHS.NAME + 1 });

    return this;
  }

  build(): TBuild extends ClassroomEntity[]
    ? ClassroomEntity[]
    : ClassroomEntity {
    const classrooms = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        const classroom = new ClassroomEntity({
          name: this.callFactory(this._name, index),
          building: this.callFactory(this._building, index),
          ...(this._createdAt && {
            createdAt: this.callFactory(this._createdAt, index),
          }),
          ...(this._updatedAt && {
            updatedAt: this.callFactory(this._updatedAt, index),
          }),
        });

        return classroom;
      });

    return (this.countObjs === 1 ? classrooms[0] : classrooms) as any;
  }

  get name() {
    return this.getValue('name');
  }

  get building() {
    return this.getValue('building');
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
