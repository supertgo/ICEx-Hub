import { CourseEntity, CourseProps } from '@/course/domain/entities/course.entity';
import { CourseDataBuilder } from '@/course/domain/testing/helper/course-data-builder';

function commonAssertions(sut: CourseEntity, props: CourseProps) { }

describe('Course entity unit tests', () => {
  let sut: CourseEntity;

  beforeEach(() => {
    CourseEntity.validate = jest.fn();
  })
});
