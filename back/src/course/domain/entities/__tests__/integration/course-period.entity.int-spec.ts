import { EntityValidationError } from '@/shared/domain/errors/validation-errors';
import { CoursePeriodDataBuilder } from '@/user/domain/testing/helper/course-period-data-builder';
import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';

describe('Course entity integration tests', () => {
  describe('Constructor tests', () => {
    it('should throw error with invalid name', () => {
      const props = {
        ...CoursePeriodDataBuilder({}),
        name: {} as any,
      };

      expect(() => new CoursePeriodEntity(props)).toThrow(
        EntityValidationError,
      );
    });
  });
});
