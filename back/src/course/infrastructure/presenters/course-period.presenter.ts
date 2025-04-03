import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { CoursePeriodOutput } from '@/course/application/dtos/course-period-output';
import { ListCoursePeriodUsecase } from '@/course/application/usecases/list-course-period.usecase';

export class CoursePeriodPresenter {
  @ApiProperty({ description: 'The id of course' })
  id: string;

  @ApiProperty({ description: 'The name of the course' })
  name: string;
  @ApiProperty({ description: 'The date when the course was created' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  @ApiProperty({ description: 'The date when the course was updated' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updatedAt: Date;

  constructor(output: CoursePeriodOutput) {
    this.id = output.id;
    this.name = output.name;
    this.createdAt = output.createdAt;
    this.updatedAt = output.updatedAt;
  }
}

export class CoursePeriodCollectionPresenter extends CollectionPresenter {
  data: CoursePeriodPresenter[];

  constructor(output: ListCoursePeriodUsecase.Output) {
    const { items, ...pagination } = output;
    super(pagination);
    this.data = items.map((item) => new CoursePeriodPresenter(item));
  }
}
