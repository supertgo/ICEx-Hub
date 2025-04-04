import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';
import { CoursePeriodDataBuilder } from '@/user/domain/testing/helper/course-period-data-builder';
import { CoursePeriodOutputMapper } from '@/course/application/dtos/course-period-output';

describe('Course period output unit tests', () => {
  it('should convert a course period in output', () => {
    const course = new CoursePeriodEntity(CoursePeriodDataBuilder({}));
    const spyJson = jest.spyOn(course, 'toJSON');
    const sut = CoursePeriodOutputMapper.toOutput(course);

    expect(spyJson).toHaveBeenCalled();
    expect(sut).toStrictEqual(course.toJSON());
  });
});
