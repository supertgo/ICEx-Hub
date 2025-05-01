import { DisciplineController } from '@/discipline/infrastructure/discipline.controller';
import { DisciplineOutput } from '@/discipline/application/dtos/discipline-output';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { ListDisciplinesDto } from '@/discipline/infrastructure/dtos/list-discipline.dto';
import { UpdateDisciplineDto } from '@/discipline/infrastructure/dtos/update-discipline.dto';
import { faker } from '@faker-js/faker';
import {
  DisciplineCollectionPresenter,
  DisciplinePresenter,
} from '@/discipline/infrastructure/presenters/discipline.presenter';
import { ListDisciplinesUsecase } from '@/discipline/application/usecases/list-discipline.usecase';

describe('DisciplineController unit tests', () => {
  let sut: DisciplineController;
  let id: string;
  let props: DisciplineOutput;

  beforeEach(() => {
    sut = new DisciplineController();
    props = {
      id: '5ea0320a-3483-42d4-be62-48e29b9a631d',
      ...DisciplineDataBuilder({}),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should list disciplines', async () => {
    const disciplines = [props];
    const output: ListDisciplinesUsecase.Output = {
      items: disciplines,
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 1,
    };

    const mockListDisciplinesUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    };

    sut['listDisciplinesUseCase'] = mockListDisciplinesUseCase as any;

    const input: ListDisciplinesDto = {};
    const presenter = await sut.search(input);
    expect(presenter).toBeInstanceOf(DisciplineCollectionPresenter);
    expect(presenter).toEqual(new DisciplineCollectionPresenter(output));
    expect(mockListDisciplinesUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should return a single discipline by ID', async () => {
    const mockGetDisciplineUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(props)),
    };

    sut['getDisciplineUseCase'] = mockGetDisciplineUseCase as any;

    const presenter = await sut.findOne(id);
    expect(presenter).toBeInstanceOf(DisciplinePresenter);
    expect(presenter).toMatchObject(new DisciplinePresenter(props));
  });

  it('should update discipline data', async () => {
    const updatedProps = { ...props, name: faker.person.fullName() };
    const mockUpdateDisciplineUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(updatedProps)),
    };

    sut['updateDisciplineUseCase'] = mockUpdateDisciplineUseCase as any;

    const input: UpdateDisciplineDto = { name: updatedProps.name };

    const presenter = await sut.update(id, input);
    expect(presenter).toBeInstanceOf(DisciplinePresenter);
    expect(presenter).toMatchObject(new DisciplinePresenter(updatedProps));
    expect(mockUpdateDisciplineUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should delete a discipline by ID', async () => {
    const mockDeleteDisciplineUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve()),
    };

    sut['deleteDisciplineUseCase'] = mockDeleteDisciplineUseCase as any;

    await sut.remove(id);
    expect(mockDeleteDisciplineUseCase.execute).toHaveBeenCalledWith({ id });
  });
});
