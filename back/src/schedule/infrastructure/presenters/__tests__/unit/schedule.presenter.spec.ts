import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';
import {
  ScheduleCollectionPresenter,
  SchedulePresenter,
} from '@/schedule/infrastructure/presenters/schedule.presenter';
import { faker } from '@faker-js/faker';
import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';

describe('Schedule presenter unit tests', () => {
  const id = faker.string.uuid();
  const props = { ...ScheduleDataBuilder({}), id };
  let sut: SchedulePresenter;

  beforeEach(() => {
    sut = new SchedulePresenter(props);
  });

  it('Constructor', () => {
    expect(sut).toBeDefined();
    expect(sut.id).toEqual(props.id);
    expect(sut.discipline).toEqual(props.discipline);
    expect(sut.classroom.name).toEqual(props.classroom.name);
    expect(sut.classroom.building).toEqual(props.classroom.building);
    expect(sut.dayPattern).toEqual(props.dayPattern);
    expect(sut.timeSlot).toEqual(props.timeSlot);
    expect(sut.createdAt).toEqual(props.createdAt);
    expect(sut.updatedAt).toEqual(props.updatedAt);
  });

  it('Should present the date as expected', () => {
    const output = instanceToPlain(sut);
    expect(output).toBeDefined();
    expect(output.id).toEqual(props.id);
    expect(output.discipline.id).toEqual(props.discipline.id);
    expect(output.classroom.id).toEqual(props.classroom.id);
    expect(output.dayPattern).toEqual(props.dayPattern);
    expect(output.timeSlot).toEqual(props.timeSlot);
    expect(output.createdAt).toEqual(props.createdAt.toISOString());
    expect(output.updatedAt).toEqual(props.updatedAt.toISOString());
  });

  describe('ScheduleCollectionPresenter', () => {
    it('Constructor', () => {
      const sut = new ScheduleCollectionPresenter({
        items: [props],
        currentPage: 2,
        lastPage: 3,
        perPage: 10,
        total: 30,
      });

      expect(sut).toBeDefined();
      expect(sut).toBeInstanceOf(ScheduleCollectionPresenter);
      expect(sut.data).toHaveLength(1);
      expect(sut.data[0]).toBeInstanceOf(SchedulePresenter);
      expect(sut.meta).toBeDefined();
      expect(sut.meta).toBeInstanceOf(PaginationPresenter);
    });

    it('Should present the date as expected', () => {
      const sut = new ScheduleCollectionPresenter({
        items: [props],
        currentPage: 2,
        lastPage: 3,
        perPage: 10,
        total: 30,
      });

      const output = instanceToPlain(sut);
      expect(output.data[0]).toBeDefined();
      expect(output.data[0].id).toEqual(props.id);
      expect(sut.data[0].discipline.id).toEqual(props.discipline.id);
      expect(output.data[0].classroom.id).toEqual(props.classroom.id);
      expect(output.data[0].dayPattern).toEqual(props.dayPattern);
      expect(output.data[0].timeSlot).toEqual(props.timeSlot);
      expect(output.data[0].createdAt).toEqual(props.createdAt.toISOString());
      expect(output.data[0].updatedAt).toEqual(props.updatedAt.toISOString());

      expect(output.meta).toBeDefined();
      expect(output.meta.currentPage).toEqual(2);
      expect(output.meta.lastPage).toEqual(3);
      expect(output.meta.perPage).toEqual(10);
      expect(output.meta.total).toEqual(30);
    });
  });
});
