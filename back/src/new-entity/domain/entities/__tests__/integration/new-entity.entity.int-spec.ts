import { NewEntityDataBuilder } from '@/new-entity/domain/testing/helper/new-entity-data-builder';
import { NewEntityEntity } from '@/new-entity/domain/entities/new-entity.entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';

describe('NewEntity entity integration tests', () => {
  describe('Constructor tests', () => {
    it('should throw error with invalid name', () => {
      const props = {
        ...NewEntityDataBuilder({}),
      };

      expect(() => new NewEntityEntity(props)).toThrow(EntityValidationError);
    });
  });
});
