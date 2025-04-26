import {
  DisciplineEntity,
  DisciplineProps,
} from '@/discipline/domain/entities/discipline.entity';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';

function commonAssertions(sut: DisciplineEntity, props: DisciplineProps) {
  expect(sut.name).toBe(props.name);
  expect(sut.code).toBe(props.code);
  expect(sut.courseId).toBe(props.courseId);
  expect(sut.coursePeriodId).toBe(props.coursePeriodId);
}

describe('Discipline entity unit tests', () => {
  let sut: DisciplineEntity;

  beforeEach(() => {
    DisciplineEntity.validate = jest.fn();
  });

  it('should create a valid discipline entity', () => {
    const props: DisciplineProps = DisciplineDataBuilder({
      name: 'Mathematics',
      code: 'MATH101',
      courseId: 'COURSE123',
      coursePeriodId: 'PERIOD456',
    });

    sut = new DisciplineEntity(props);

    commonAssertions(sut, props);
    expect(DisciplineEntity.validate).toHaveBeenCalledWith(props);
  });

  it('should throw an error if validate fails', () => {
    (DisciplineEntity.validate as jest.Mock).mockImplementation(() => {
      throw new Error('Validation failed');
    });

    const props: DisciplineProps = DisciplineDataBuilder({
      name: 'Invalid Name',
      code: 'INVALID_CODE',
      courseId: 'COURSE123',
      coursePeriodId: 'PERIOD456',
    });

    expect(() => new DisciplineEntity(props)).toThrow('Validation failed');
    expect(DisciplineEntity.validate).toHaveBeenCalledWith(props);
  });
});
