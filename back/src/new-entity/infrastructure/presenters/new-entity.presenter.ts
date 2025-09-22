import { NewEntityOutput } from '@/new-entity/application/dtos/new-entity-output';
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ListNewEntitysUsecase } from '@/new-entity/application/usecases/list-new-entitys.usecase';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

export class NewEntityPresenter {
  constructor(output: NewEntityOutput) { }
}

@ApiExtraModels(NewEntityPresenter)
export class NewEntityCollectionPresenter extends CollectionPresenter {
  @ApiProperty({
    type: NewEntityPresenter,
    isArray: true,
    description: 'List of NewEntity',
  })
  data: NewEntityPresenter[];

  constructor(output: ListNewEntitysUsecase.Output) {
    const { items, ...pagination } = output;
    super(pagination);
    this.data = items.map((item) => new NewEntityPresenter(item));
  }
}
