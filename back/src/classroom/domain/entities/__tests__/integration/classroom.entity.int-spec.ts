import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';

describe('Classroom entity integration tests', () => {
  describe('Constructor tests', () => {
    it('should throw error with invalid name', () => {
      expect(() =>
        ClassroomEntity.fake().aCADClassroom().withInvalidNameTooLong().build(),
      ).toThrow(EntityValidationError);
    });
  });
});
