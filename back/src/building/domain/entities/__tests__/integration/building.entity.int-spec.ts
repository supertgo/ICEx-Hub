import { BuildingDataBuilder } from '@/building/domain/testing/helper/building-data-builder';
import { BuildingEntity } from '@/building/domain/entities/building.entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';

describe('Building entity integration tests', () => {
  describe('Constructor tests', () => {
    it('should throw error with invalid name', () => {
      const props = {
        ...BuildingDataBuilder({}),
      };

      expect(() => new BuildingEntity(props)).toThrow(EntityValidationError);
    });
  });
});
