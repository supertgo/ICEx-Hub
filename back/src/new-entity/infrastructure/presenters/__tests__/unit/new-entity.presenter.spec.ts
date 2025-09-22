import { NewEntityDataBuilder } from '@/new-entity/domain/testing/helper/new-entity-data-builder';
import {
  NewEntityCollectionPresenter,
  NewEntityPresenter,
} from '@/new-entity/infrastructure/presenters/new-entity.presenter';
import { faker } from '@faker-js/faker';
import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';

describe('NewEntity presenter unit tests', () => {
  const id = faker.string.uuid();
  let props = { ...NewEntityDataBuilder({}), id };
  let sut: NewEntityPresenter;

  beforeEach(() => {
    sut = new NewEntityPresenter(props);
  });

  it.todo('Constructor', () => { });

  it('Should present the date as expected', () => {
    const output = instanceToPlain(sut);
  });

  describe('NewEntityCollectionPresenter', () => {
    let sut: NewEntityCollectionPresenter;

    it('Constructor', () => {
      const sut = new NewEntityCollectionPresenter({
        items: [props],
        currentPage: 2,
        lastPage: 3,
        perPage: 10,
        total: 30,
      });

      expect(sut).toBeDefined();
      expect(sut).toBeInstanceOf(NewEntityCollectionPresenter);
      expect(sut.data).toHaveLength(1);
      expect(sut.data[0]).toBeInstanceOf(NewEntityPresenter);
      expect(sut.meta).toBeDefined();
      expect(sut.meta).toBeInstanceOf(PaginationPresenter);
    });

    it('Should present the date as expected', () => {
      const sut = new NewEntityCollectionPresenter({
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
