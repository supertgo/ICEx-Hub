import { BuildingOutput } from '@/building/application/dtos/building-output';
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ListBuildingsUsecase } from '@/building/application/usecases/list-buildings.usecase';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

export class BuildingPresenter {
  constructor(output: BuildingOutput) { }
}

@ApiExtraModels(BuildingPresenter)
export class BuildingCollectionPresenter extends CollectionPresenter {
  @ApiProperty({
    type: BuildingPresenter,
    isArray: true,
    description: 'List of Building',
  })
  data: BuildingPresenter[];

  constructor(output: ListBuildingsUsecase.Output) {
    const { items, ...pagination } = output;
    super(pagination);
    this.data = items.map((item) => new BuildingPresenter(item));
  }
}
