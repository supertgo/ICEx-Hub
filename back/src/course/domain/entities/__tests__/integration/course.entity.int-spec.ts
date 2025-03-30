import { CourseEntity } from '@/course/domain/entities/course.entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-errors';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';

describe('Course entity integration tests', () => {
  describe('Constructor tests', () => {
    it('should throw error with invalid name', () => {
      const props = {
        ...CourseDataBuilder({}),
        name: {} as any,
      };

      expect(() => new CourseEntity(props)).toThrow(EntityValidationError);
    });

    it('should throw error with invalid code', () => {
      const props = {
        ...CourseDataBuilder({}),
        code: {} as any,
      };

      expect(() => new CourseEntity(props)).toThrow(EntityValidationError);
    });
  });
});
