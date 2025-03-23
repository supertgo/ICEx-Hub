import { faker } from '@faker-js/faker';
import {
  CLASSROOM_BUILDING,
  ClassroomEntity,
  ClassroomProps,
} from '@/classroom/domain/entities/classroom.entity';

function commonAssertions(sut: ClassroomEntity, props: ClassroomProps) {
  expect(sut).toBeDefined();
  expect(sut).toBeInstanceOf(ClassroomEntity);
  expect(ClassroomEntity.validate).toHaveBeenCalled();

  expect(sut.props.name).toBe(props.name);
  expect(sut.props.building).toBe(props.building);
}

describe('Classroom entity unit tests', () => {
  let sut: ClassroomEntity;

  beforeEach(() => {
    ClassroomEntity.validate = jest.fn();
  });

  it('should create a classroom without passing created at', () => {
    const props = {
      name: faker.word.words(),
      building: CLASSROOM_BUILDING.ICEX,
    };

    sut = new ClassroomEntity(props);

    commonAssertions(sut, props);

    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });
});
