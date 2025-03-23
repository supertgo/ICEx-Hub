import { ClassroomDataBuilder } from '@/classroom/domain/testing/helper/classroom-data-builder';
import {
  ClassroomCollectionPresenter,
  ClassroomPresenter,
} from '@/classroom/infrastructure/presenters/classroom.presenter';
import { faker } from '@faker-js/faker';
import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';

describe('Classroom presenter unit tests', () => {
  const id = faker.string.uuid();
  let props = { ...ClassroomDataBuilder({}), id };
  let sut: ClassroomPresenter;

  beforeEach(() => {
    sut = new ClassroomPresenter(props);
  });

  it.todo('Constructor', () => { });

  it('Should present the date as expected', () => {
    const output = instanceToPlain(sut);
  });

  describe('ClassroomCollectionPresenter', () => {
    let sut: ClassroomCollectionPresenter;

    it('Constructor', () => {
      const sut = new ClassroomCollectionPresenter({
        items: [props],
        currentPage: 2,
        lastPage: 3,
        perPage: 10,
        total: 30,
      });

      expect(sut).toBeDefined();
      expect(sut).toBeInstanceOf(ClassroomCollectionPresenter);
      expect(sut.data).toHaveLength(1);
      expect(sut.data[0]).toBeInstanceOf(ClassroomPresenter);
      expect(sut.meta).toBeDefined();
      expect(sut.meta).toBeInstanceOf(PaginationPresenter);
    });

    it('Should present the date as expected', () => {
      const sut = new ClassroomCollectionPresenter({
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
