import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { CoursePeriodOutput } from '@/course/application/dtos/course-period-output';
import { ListCoursePeriodUsecase } from '@/course/application/usecases/list-course-period.usecase';

export class CoursePeriodPresenter {
  @ApiProperty({ description: 'The id of course period' })
  id: string;

  @ApiProperty({ description: 'The name of the course period' })
  name: string;
  @ApiProperty({ description: 'The date when the course period was created' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  @ApiProperty({ description: 'The date when the course period was updated' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updatedAt: Date;

  constructor(output: CoursePeriodOutput) {
    this.id = output.id;
    this.name = output.name;
    this.createdAt = output.createdAt;
    this.updatedAt = output.updatedAt;
  }
}

@ApiExtraModels(CoursePeriodPresenter)
export class CoursePeriodCollectionPresenter extends CollectionPresenter {
  @ApiProperty({
    type: CoursePeriodPresenter,
    isArray: true,
    description: 'List of course periods',
  })
  data: CoursePeriodPresenter[];

  constructor(output: ListCoursePeriodUsecase.Output) {
    const { items, ...paginationProps } = output;
    super({
      currentPage: paginationProps.currentPage,
      perPage: paginationProps.perPage,
      lastPage: paginationProps.lastPage,
      total: paginationProps.total,
    });
    this.data = items.map((item) => new CoursePeriodPresenter(item));
  }
}
