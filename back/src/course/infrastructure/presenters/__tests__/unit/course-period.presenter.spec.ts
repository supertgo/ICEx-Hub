import {
  CourseCollectionPresenter,
  CoursePresenter,
} from '@/course/infrastructure/presenters/course.presenter';
import { faker } from '@faker-js/faker';
import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';
import { CoursePeriodPresenter } from '@/course/infrastructure/presenters/course-period.presenter';

describe('Course period presenter unit tests', () => {
  const id = faker.string.uuid();
  const props = { ...CourseDataBuilder({}), id };
  let sut: CoursePeriodPresenter;

  beforeEach(() => {
    sut = new CoursePeriodPresenter(props);
  });

  it('Constructor', () => {
    expect(sut).toBeDefined();
    expect(sut.id).toEqual(props.id);
    expect(sut.name).toEqual(props.name);
    expect(sut.createdAt).toEqual(props.createdAt);
    expect(sut.updatedAt).toEqual(props.updatedAt);
  });

  it('Should present the data as expected', () => {
    const output = instanceToPlain(sut);

    expect(output).toBeDefined();
    expect(output.id).toEqual(id);
    expect(output.name).toEqual(props.name);
    expect(output.createdAt).toEqual(props.createdAt.toISOString());
    expect(output.updatedAt).toEqual(props.updatedAt.toISOString());
  });

  describe('CoursePeriodCollectionPresenter', () => {
    it('Constructor', () => {
      const sut = new CourseCollectionPresenter({
        items: [props],
        currentPage: 2,
        lastPage: 3,
        perPage: 10,
        total: 30,
      });

      expect(sut).toBeDefined();
      expect(sut).toBeInstanceOf(CourseCollectionPresenter);
      expect(sut.data).toHaveLength(1);
      expect(sut.data[0]).toBeInstanceOf(CoursePresenter);
      expect(sut.meta).toBeDefined();
      expect(sut.meta).toBeInstanceOf(PaginationPresenter);
    });

    it('Should present the data as expected', () => {
      const sut = new CourseCollectionPresenter({
        items: [props],
        currentPage: 2,
        lastPage: 3,
        perPage: 10,
        total: 30,
      });

      const output = instanceToPlain(sut);

      expect(output).toBeDefined();
      expect(output.data).toBeDefined();
      expect(output.data).toHaveLength(1);
      expect(output.data[0].id).toEqual(id);
      expect(output.data[0].name).toEqual(props.name);
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
