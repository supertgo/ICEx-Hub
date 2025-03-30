import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';
import {
  ScheduleCollectionPresenter,
  SchedulePresenter,
} from '@/schedule/infrastructure/presenters/schedule.presenter';
import { faker } from '@faker-js/faker';
import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';

describe('Schedule presenter unit tests', () => {
  const id = faker.string.uuid();
  let props = { ...ScheduleDataBuilder({}), id };
  let sut: SchedulePresenter;

  beforeEach(() => {
    sut = new SchedulePresenter(props);
  });

  it.todo('Constructor', () => { });

  it('Should present the date as expected', () => {
    const output = instanceToPlain(sut);
  });

  describe('ScheduleCollectionPresenter', () => {
    let sut: ScheduleCollectionPresenter;

    it('Constructor', () => {
      const sut = new ScheduleCollectionPresenter({
        items: [props],
        currentPage: 2,
        lastPage: 3,
        perPage: 10,
        total: 30,
      });

      expect(sut).toBeDefined();
      expect(sut).toBeInstanceOf(ScheduleCollectionPresenter);
      expect(sut.data).toHaveLength(1);
      expect(sut.data[0]).toBeInstanceOf(SchedulePresenter);
      expect(sut.meta).toBeDefined();
      expect(sut.meta).toBeInstanceOf(PaginationPresenter);
    });

    it('Should present the date as expected', () => {
      const sut = new ScheduleCollectionPresenter({
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
