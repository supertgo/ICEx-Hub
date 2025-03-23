import { ClassroomDataBuilder } from '@/classroom/domain/testing/helper/classroom-data-builder';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';

describe('Classroom entity integration tests', () => {
  describe('Constructor tests', () => {
    it('should throw error with invalid name', () => {
      const props = {
        ...ClassroomDataBuilder({}),
      };

      expect(() => new ClassroomEntity(props)).toThrow(EntityValidationError);
    });
  });
});
