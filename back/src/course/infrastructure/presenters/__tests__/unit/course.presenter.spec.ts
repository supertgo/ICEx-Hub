import {
  CourseCollectionPresenter,
  CoursePresenter,
} from '@/course/infrastructure/presenters/course.presenter';
import { faker } from '@faker-js/faker';
import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';

describe('Course presenter unit tests', () => {
  const id = faker.string.uuid();
  let props = { ...CourseDataBuilder({}), id };
  let sut: CoursePresenter;

  beforeEach(() => {
    sut = new CoursePresenter(props);
  });

  it.todo('Constructor', () => { });

  it('Should present the date as expected', () => {
    const output = instanceToPlain(sut);
  });

  describe('CourseCollectionPresenter', () => {
    let sut: CourseCollectionPresenter;

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

    it('Should present the date as expected', () => {
      const sut = new CourseCollectionPresenter({
        items: [props],
        currentPage: 2,
        lastPage: 3,
        perPage: 10,
        total: 30,
      });

      const output = instanceToPlain(sut);
    });
  });
});
