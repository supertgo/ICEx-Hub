import { CourseCollectionPresenter, CoursePresenter } from '@/course/infrastructure/presenters/course.presenter';
import { faker } from '@faker-js/faker';
import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';

describe('Course presenter unit tests', () => {
  const id = faker.string.uuid();
  const props = { ...CourseDataBuilder({}), id };
  let sut: CoursePresenter;

  beforeEach(() => {
    sut = new CoursePresenter(props);
  });

  it('Constructor', () => {
    expect(sut).toBeDefined();
    expect(sut.id).toEqual(props.id);
    expect(sut.name).toEqual(props.name);
    expect(sut.code).toEqual(props.code);
    expect(sut.createdAt).toEqual(props.createdAt);
    expect(sut.updatedAt).toEqual(props.updatedAt);
  });

  it('Should present the data as expected', () => {
    const output = instanceToPlain(sut);

    expect(output).toBeDefined();
    expect(output.id).toEqual(id);
    expect(output.name).toEqual(props.name);
    expect(output.code).toEqual(props.code);
    expect(output.createdAt).toEqual(props.createdAt.toISOString());
    expect(output.updatedAt).toEqual(props.updatedAt.toISOString());
  });

  describe('CourseCollectionPresenter', () => {
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
      expect(output.data[0].code).toEqual(props.code);
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
