import { faker } from '@faker-js/faker';
import {
  ClassroomEntity,
  ClassroomProps,
} from '@/classroom/domain/entities/classroom.entity';
import { CLASSROOM_BUILDING } from '@/classroom/domain/classroom.constants';

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

  it('should create a classroom passing created at', () => {
    const props: ClassroomProps = {
      name: faker.word.words(),
      building: CLASSROOM_BUILDING.ICEX,
      createdAt: new Date(),
    };

    sut = new ClassroomEntity(props);

    commonAssertions(sut, props);

    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
    expect(sut.props.createdAt).toBe(props.createdAt);
  });

  it('name gettter', () => {
    const classroom = ClassroomEntity.fake()
      .aIcexClassroom()
      .withName('name getter')
      .build();

    expect(classroom.name).toBeDefined();
    expect(typeof classroom.name).toBe('string');
    expect(classroom.name).toBe('name getter');
  });

  it('building getter', () => {
    const classroom = ClassroomEntity.fake().aCADClassroom().build();

    expect(classroom.building).toBeDefined();
    expect(classroom.building).toBe(CLASSROOM_BUILDING.CAD3);
  });

  it('createdAt gettter', () => {
    const createAt = new Date();
    const classroom = ClassroomEntity.fake()
      .aIcexClassroom()
      .withCreatedAt(createAt)
      .build();

    expect(classroom.createdAt).toBeDefined();
    expect(classroom.createdAt).toBeInstanceOf(Date);
    expect(classroom.createdAt).toBe(createAt);
  });
});
