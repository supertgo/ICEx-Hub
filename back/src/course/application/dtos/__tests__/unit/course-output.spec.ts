import { CourseEntity } from '@/course/domain/entities/course.entity';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';
import { CourseOutputMapper } from '@/course/application/dtos/course-output';

describe('Course output unit tests', () => {
  it('should convert a course in output', () => {
    const course = new CourseEntity(CourseDataBuilder({}));
    const spyJson = jest.spyOn(course, 'toJSON');
    const sut = CourseOutputMapper.toOutput(course);

    expect(spyJson).toHaveBeenCalled();
    expect(sut).toStrictEqual(course.toJSON());
  });
});
