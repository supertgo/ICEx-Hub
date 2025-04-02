import { ScheduleController } from '@/schedule/infrastructure/schedule.controller';
import { ScheduleOutput } from '@/schedule/application/dtos/schedule-output';
import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';
import { ListSchedulesDto } from '@/schedule/infrastructure/dtos/list-schedule.dto';
import { UpdateScheduleDto } from '@/schedule/infrastructure/dtos/update-schedule.dto';
import { faker } from '@faker-js/faker';
import {
  ScheduleCollectionPresenter,
  SchedulePresenter,
} from '@/schedule/infrastructure/presenters/schedule.presenter';
import { ListSchedulesUsecase } from '@/schedule/application/usecases/list-schedule.usecase';

describe('ScheduleController unit tests', () => {
  let sut: ScheduleController;
  let id: string;
  let props: ScheduleOutput;

  beforeEach(() => {
    sut = new ScheduleController();
    props = {
      id: '5ea0320a-3483-42d4-be62-48e29b9a631d',
      ...ScheduleDataBuilder({}),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should list schedules', async () => {
    const schedules = [props];
    const output: ListSchedulesUsecase.Output = {
      items: schedules,
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 1,
    };

    const mockListSchedulesUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    };

    sut['listSchedulesUseCase'] = mockListSchedulesUseCase as any;

    const input: ListSchedulesDto = {};
    const presenter = await sut.search(input);
    expect(presenter).toBeInstanceOf(ScheduleCollectionPresenter);
    expect(presenter).toEqual(new ScheduleCollectionPresenter(output));
    expect(mockListSchedulesUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should return a single schedule by ID', async () => {
    const mockGetScheduleUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(props)),
    };

    sut['getScheduleUseCase'] = mockGetScheduleUseCase as any;

    const presenter = await sut.findOne(id);
    expect(presenter).toBeInstanceOf(SchedulePresenter);
    expect(presenter).toMatchObject(new SchedulePresenter(props));
  });

  it('should update schedule data', async () => {
    const updatedProps = { ...props, classroomId: faker.string.uuid() };
    const mockUpdateScheduleUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(updatedProps)),
    };

    sut['updateScheduleUseCase'] = mockUpdateScheduleUseCase as any;

    const input: UpdateScheduleDto = { classroomId: updatedProps.classroomId };

    const presenter = await sut.update(id, input);
    expect(presenter).toBeInstanceOf(SchedulePresenter);
    expect(presenter).toMatchObject(new SchedulePresenter(updatedProps));
    expect(mockUpdateScheduleUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should delete a schedule by ID', async () => {
    const mockDeleteScheduleUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve()),
    };

    sut['deleteScheduleUseCase'] = mockDeleteScheduleUseCase as any;

    await sut.remove(id);
    expect(mockDeleteScheduleUseCase.execute).toHaveBeenCalledWith({ id });
  });
});
