import {
  ClassroomCollectionPresenter,
  ClassroomPresenter,
} from '@/classroom/infrastructure/presenters/classroom.presenter';
import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';

describe('Classroom presenter unit tests', () => {
  const entity = ClassroomEntity.fake().aCADClassroom().build();
  const props = {
    building: entity.building,
    createdAt: entity.createdAt,
    name: entity.name,
    id: entity.id,
  };
  let sut: ClassroomPresenter;

  beforeEach(() => {
    sut = new ClassroomPresenter(props);
  });

  it('Constructor', () => {
    expect(sut).toBeDefined();
    expect(sut.id).toEqual(props.id);
    expect(sut.name).toEqual(props.name);
    expect(sut.building).toEqual(props.building);
    expect(sut.createdAt).toEqual(props.createdAt);
  });

  it('Should present the date as expected', () => {
    const output = instanceToPlain(sut);

    expect(output).toStrictEqual({
      id: props.id,
      name: props.name,
      building: props.building,
      createdAt: props.createdAt.toISOString(),
    });
  });

  describe('ClassroomCollectionPresenter', () => {
    it('Constructor', () => {
      const sut = new ClassroomCollectionPresenter({
        items: [props],
        currentPage: 2,
        lastPage: 3,
        perPage: 10,
        total: 30,
      });

      expect(sut).toBeDefined();
      expect(sut).toBeInstanceOf(ClassroomCollectionPresenter);
      expect(sut.data).toHaveLength(1);
      expect(sut.data[0]).toBeInstanceOf(ClassroomPresenter);
      expect(sut.meta).toBeDefined();
      expect(sut.meta).toBeInstanceOf(PaginationPresenter);
    });

    it('Should present the date as expected', () => {
      const sut = new ClassroomCollectionPresenter({
        items: [props],
        currentPage: 2,
        lastPage: 3,
        perPage: 10,
        total: 30,
      });

      const output = instanceToPlain(sut);

      expect(output).toBeDefined();
      expect(output.data).toBeDefined();
      expect(output.data[0].id).toEqual(props.id);
      expect(output.data[0].name).toEqual(props.name);
      expect(output.data[0].building).toEqual(props.building);
      expect(output.data[0].createdAt).toEqual(props.createdAt.toISOString());

      expect(output.meta).toBeDefined();
      expect(output.meta.currentPage).toEqual(2);
      expect(output.meta.lastPage).toEqual(3);
      expect(output.meta.perPage).toEqual(10);
      expect(output.meta.total).toEqual(30);
    });
  });
});
