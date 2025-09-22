import { BuildingController } from '@/building/infrastructure/building.controller';
import { BuildingOutput } from '@/building/application/dtos/building-output';
import { BuildingDataBuilder } from '@/building/domain/testing/helper/building-data-builder';
import { ListBuildingsDto } from '@/building/infrastructure/dtos/list-building.dto';
import { UpdateBuildingDto } from '@/building/infrastructure/dtos/update-building.dto';
import { faker } from '@faker-js/faker';
import {
  BuildingCollectionPresenter,
  BuildingPresenter,
} from '@/building/infrastructure/presenters/building.presenter';
import { ListBuildingsUsecase } from '@/building/application/usecases/list-building.usecase';

describe('BuildingController unit tests', () => {
  let sut: BuildingController;
  let id: string;
  let props: BuildingOutput;

  beforeEach(() => {
    sut = new BuildingController();
    props = {
      id: '5ea0320a-3483-42d4-be62-48e29b9a631d',
      ...BuildingDataBuilder({}),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });


  it('should list buildings', async () => {
    const buildings = [props];
    const output: ListBuildingsUsecase.Output = {
      items: buildings,
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 1,
    };

    const mockListBuildingsUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    };

    sut['listBuildingsUseCase'] = mockListBuildingsUseCase as any;

    const input: ListBuildingsDto = {};
    const presenter = await sut.search(input);
    expect(presenter).toBeInstanceOf(BuildingCollectionPresenter);
    expect(presenter).toEqual(new BuildingCollectionPresenter(output));
    expect(mockListBuildingsUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should return a single building by ID', async () => {
    const mockGetBuildingUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(props)),
    };

    sut['getBuildingUseCase'] = mockGetBuildingUseCase as any;

    const presenter = await sut.findOne(id);
    expect(presenter).toBeInstanceOf(BuildingPresenter);
    expect(presenter).toMatchObject(new BuildingPresenter(props));
  });

  it('should update building data', async () => {
    const updatedProps = { ...props, name: faker.person.fullName() };
    const mockUpdateBuildingUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(updatedProps)),
    };

    sut['updateBuildingUseCase'] = mockUpdateBuildingUseCase as any;

    const input: UpdateBuildingDto = { name: updatedProps.name };

    const presenter = await sut.update(id, input);
    expect(presenter).toBeInstanceOf(BuildingPresenter);
    expect(presenter).toMatchObject(new BuildingPresenter(updatedProps));
    expect(mockUpdateBuildingUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should delete a building by ID', async () => {
    const mockDeleteBuildingUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve()),
    };

    sut['deleteBuildingUseCase'] = mockDeleteBuildingUseCase as any;

    await sut.remove(id);
    expect(mockDeleteBuildingUseCase.execute).toHaveBeenCalledWith({ id });
  });
});
