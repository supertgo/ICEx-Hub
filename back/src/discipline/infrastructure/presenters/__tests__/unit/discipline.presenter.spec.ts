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
  let props = { ...DisciplineDataBuilder({}), id };
  let sut: DisciplinePresenter;

  beforeEach(() => {
    sut = new DisciplinePresenter(props);
  });

  it.todo('Constructor', () => { });

  it('Should present the date as expected', () => {
    const output = instanceToPlain(sut);
  });

  describe('DisciplineCollectionPresenter', () => {
    let sut: DisciplineCollectionPresenter;

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
    });
  });
});
