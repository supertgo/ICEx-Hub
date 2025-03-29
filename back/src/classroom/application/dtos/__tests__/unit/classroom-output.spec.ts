import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { ClassroomOutputMapper } from '@/classroom/application/dtos/classroom-output';

describe('Classroom output unit tests', () => {
  it('should convert a classroom in output', () => {
    const classroom = ClassroomEntity.fake().aCADClassroom().build();
    const spyJson = jest.spyOn(classroom, 'toJSON');
    const sut = ClassroomOutputMapper.toOutput(classroom);

    expect(spyJson).toHaveBeenCalled();
    expect(sut).toStrictEqual(classroom.toJSON());
  });
});
