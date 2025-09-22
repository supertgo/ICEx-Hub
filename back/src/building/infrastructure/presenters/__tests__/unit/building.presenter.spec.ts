import { BuildingDataBuilder } from '@/building/domain/testing/helper/building-data-builder';
import {
  BuildingCollectionPresenter,
  BuildingPresenter,
} from '@/building/infrastructure/presenters/building.presenter';
import { faker } from '@faker-js/faker';
import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';

describe('Building presenter unit tests', () => {
  const id = faker.string.uuid();
  let props = { ...BuildingDataBuilder({}), id };
  let sut: BuildingPresenter;

  beforeEach(() => {
    sut = new BuildingPresenter(props);
  });

  it.todo('Constructor', () => { });

  it('Should present the date as expected', () => {
    const output = instanceToPlain(sut);
  });

  describe('BuildingCollectionPresenter', () => {
    let sut: BuildingCollectionPresenter;

    it('Constructor', () => {
      const sut = new BuildingCollectionPresenter({
        items: [props],
        currentPage: 2,
        lastPage: 3,
        perPage: 10,
        total: 30,
      });

      expect(sut).toBeDefined();
      expect(sut).toBeInstanceOf(BuildingCollectionPresenter);
      expect(sut.data).toHaveLength(1);
      expect(sut.data[0]).toBeInstanceOf(BuildingPresenter);
      expect(sut.meta).toBeDefined();
      expect(sut.meta).toBeInstanceOf(PaginationPresenter);
    });

    it('Should present the date as expected', () => {
      const sut = new BuildingCollectionPresenter({
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
