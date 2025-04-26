import { DisciplineOutput } from '@/discipline/application/dtos/discipline-output';
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ListDisciplinesUsecase } from '@/discipline/application/usecases/list-disciplines.usecase';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

export class DisciplinePresenter {
  constructor(output: DisciplineOutput) { }
}

@ApiExtraModels(DisciplinePresenter)
export class DisciplineCollectionPresenter extends CollectionPresenter {
  @ApiProperty({
    type: DisciplinePresenter,
    isArray: true,
    description: 'List of Discipline',
  })
  data: DisciplinePresenter[];

  constructor(output: ListDisciplinesUsecase.Output) {
    const { items, ...pagination } = output;
    super(pagination);
    this.data = items.map((item) => new DisciplinePresenter(item));
  }
}
