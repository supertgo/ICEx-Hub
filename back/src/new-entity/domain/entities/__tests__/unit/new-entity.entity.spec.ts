import { NewEntityEntity, NewEntityProps } from '@/new-entity/domain/entities/new-entity.entity';
import { NewEntityDataBuilder } from '@/new-entity/domain/testing/helper/new-entity-data-builder';

function commonAssertions(sut: NewEntityEntity, props: NewEntityProps) { }

describe('NewEntity entity unit tests', () => {
  let sut: NewEntityEntity;

  beforeEach(() => {
    NewEntityEntity.validate = jest.fn();
  })
});
