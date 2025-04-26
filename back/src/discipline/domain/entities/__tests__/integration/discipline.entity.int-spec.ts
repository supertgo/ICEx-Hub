import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';

describe('Discipline entity integration tests', () => {
  describe('Constructor tests', () => {
    it('should throw error with invalid name', () => {
      const props = {
        ...DisciplineDataBuilder({}),
      };

      expect(() => new DisciplineEntity(props)).toThrow(EntityValidationError);
    });
  });
});
