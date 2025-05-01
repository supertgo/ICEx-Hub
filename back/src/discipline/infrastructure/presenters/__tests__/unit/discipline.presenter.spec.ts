import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import {
  DisciplineCollectionPresenter,
  DisciplinePresenter,
} from '@/discipline/infrastructure/presenters/discipline.presenter';
import { faker } from '@faker-js/faker';
import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';

describe('Discipline presenter unit tests', () => {
  const id = faker.string.uuid();
  const props = { ...DisciplineDataBuilder({}), id };
  let sut: DisciplinePresenter;

  beforeEach(() => {
    sut = new DisciplinePresenter(props);
  });

  it('Constructor', () => {
    expect(sut).toBeDefined();
    expect(sut.id).toEqual(props.id);
    expect(sut.name).toEqual(props.name);
    expect(sut.code).toEqual(props.code);
    expect(sut.courseId).toEqual(props.courseId);
    expect(sut.coursePeriodId).toEqual(props.coursePeriodId);
    expect(sut.createdAt).toEqual(props.createdAt);
    expect(sut.updatedAt).toEqual(props.updatedAt);
  });

  it('Should present the date as expected', () => {
    const output = instanceToPlain(sut);
    expect(output).toBeDefined();
    expect(output.id).toEqual(props.id);
    expect(output.name).toEqual(props.name);
    expect(output.code).toEqual(props.code);
    expect(output.courseId).toEqual(props.courseId);
    expect(output.coursePeriodId).toEqual(props.coursePeriodId);
    expect(output.createdAt).toEqual(props.createdAt.toISOString());
    expect(output.updatedAt).toEqual(props.updatedAt.toISOString());
  });

  describe('DisciplineCollectionPresenter', () => {
    it('Constructor', () => {
      const sut = new DisciplineCollectionPresenter({
        items: [props],
        currentPage: 2,
        lastPage: 3,
        perPage: 10,
        total: 30,
      });

      expect(sut).toBeDefined();
      expect(sut).toBeInstanceOf(DisciplineCollectionPresenter);
      expect(sut.data).toHaveLength(1);
      expect(sut.data[0]).toBeInstanceOf(DisciplinePresenter);
      expect(sut.meta).toBeDefined();
      expect(sut.meta).toBeInstanceOf(PaginationPresenter);
    });

    it('Should present the date as expected', () => {
      const sut = new DisciplineCollectionPresenter({
        items: [props],
        currentPage: 2,
        lastPage: 3,
        perPage: 10,
        total: 30,
      });

      const output = instanceToPlain(sut);
      expect(output.data[0]).toBeDefined();
      expect(output.data[0].id).toEqual(props.id);
      expect(output.data[0].name).toEqual(props.name);
      expect(output.data[0].code).toEqual(props.code);
      expect(output.data[0].courseId).toEqual(props.courseId);
      expect(output.data[0].coursePeriodId).toEqual(props.coursePeriodId);
      expect(output.data[0].createdAt).toEqual(props.createdAt.toISOString());
      expect(output.data[0].updatedAt).toEqual(props.updatedAt.toISOString());

      expect(output.meta).toBeDefined();
      expect(output.meta.currentPage).toEqual(2);
      expect(output.meta.lastPage).toEqual(3);
      expect(output.meta.perPage).toEqual(10);
      expect(output.meta.total).toEqual(30);
    });
  });
});
