import { DisciplineOutput } from '@/discipline/application/dtos/discipline-output';
import { Transform } from 'class-transformer';
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ListDisciplinesUsecase } from '../../application/usecases/list-discipline.usecase';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

export class DisciplinePresenter {
  @ApiProperty({ description: 'The id of the discipline' })
  id: string;

  @ApiProperty({ description: 'The name of the discipline' })
  name: string;

  @ApiProperty({ description: 'The code of the discipline' })
  code: string;

  @ApiProperty({ description: 'The courseId of the discipline' })
  courseId: string;

  @ApiProperty({ description: 'The coursePeriodId of the discipline' })
  coursePeriodId: string;

  @ApiProperty({ description: 'The date when the discipline was created' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  @ApiProperty({ description: 'The date when the discipline was updated' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updatedAt: Date;

  constructor(output: DisciplineOutput) {
    this.id = output.id;
    this.name = output.name;
    this.code = output.code;
    this.courseId = output.courseId;
    this.coursePeriodId = output.coursePeriodId;
    this.createdAt = output.createdAt;
    this.updatedAt = output.updatedAt;
  }
}

@ApiExtraModels(DisciplinePresenter)
export class DisciplineCollectionPresenter extends CollectionPresenter {
  @ApiProperty({
    type: DisciplinePresenter,
    isArray: true,
    description: 'List of disciplines',
  })
  data: DisciplinePresenter[];

  constructor(output: ListDisciplinesUsecase.Output) {
    const { items, ...pagination } = output;
    super(pagination);
    this.data = items.map((item) => new DisciplinePresenter(item));
  }
}
