import { NewEntityController } from '@/new-entity/infrastructure/new-entity.controller';
import { NewEntityOutput } from '@/new-entity/application/dtos/new-entity-output';
import { NewEntityDataBuilder } from '@/new-entity/domain/testing/helper/new-entity-data-builder';
import { ListNewEntitysDto } from '@/new-entity/infrastructure/dtos/list-new-entity.dto';
import { UpdateNewEntityDto } from '@/new-entity/infrastructure/dtos/update-new-entity.dto';
import { faker } from '@faker-js/faker';
import {
  NewEntityCollectionPresenter,
  NewEntityPresenter,
} from '@/new-entity/infrastructure/presenters/new-entity.presenter';
import { ListNewEntitysUsecase } from '@/new-entity/application/usecases/list-new-entity.usecase';

describe('NewEntityController unit tests', () => {
  let sut: NewEntityController;
  let id: string;
  let props: NewEntityOutput;

  beforeEach(() => {
    sut = new NewEntityController();
    props = {
      id: '5ea0320a-3483-42d4-be62-48e29b9a631d',
      ...NewEntityDataBuilder({}),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });


  it('should list new-entitys', async () => {
    const new-entitys = [props];
    const output: ListNewEntitysUsecase.Output = {
      items: new-entitys,
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 1,
    };

    const mockListNewEntitysUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    };

    sut['listNewEntitysUseCase'] = mockListNewEntitysUseCase as any;

    const input: ListNewEntitysDto = {};
    const presenter = await sut.search(input);
    expect(presenter).toBeInstanceOf(NewEntityCollectionPresenter);
    expect(presenter).toEqual(new NewEntityCollectionPresenter(output));
    expect(mockListNewEntitysUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should return a single new-entity by ID', async () => {
    const mockGetNewEntityUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(props)),
    };

    sut['getNewEntityUseCase'] = mockGetNewEntityUseCase as any;

    const presenter = await sut.findOne(id);
    expect(presenter).toBeInstanceOf(NewEntityPresenter);
    expect(presenter).toMatchObject(new NewEntityPresenter(props));
  });

  it('should update new-entity data', async () => {
    const updatedProps = { ...props, name: faker.person.fullName() };
    const mockUpdateNewEntityUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(updatedProps)),
    };

    sut['updateNewEntityUseCase'] = mockUpdateNewEntityUseCase as any;

    const input: UpdateNewEntityDto = { name: updatedProps.name };

    const presenter = await sut.update(id, input);
    expect(presenter).toBeInstanceOf(NewEntityPresenter);
    expect(presenter).toMatchObject(new NewEntityPresenter(updatedProps));
    expect(mockUpdateNewEntityUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should delete a new-entity by ID', async () => {
    const mockDeleteNewEntityUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve()),
    };

    sut['deleteNewEntityUseCase'] = mockDeleteNewEntityUseCase as any;

    await sut.remove(id);
    expect(mockDeleteNewEntityUseCase.execute).toHaveBeenCalledWith({ id });
  });
});
