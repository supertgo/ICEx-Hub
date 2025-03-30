import { CourseOutput } from '@/course/application/dtos/course-output';
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ListCoursesUsecase } from '@/course/application/usecases/list-course.usecase';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CoursePresenter {
  @ApiProperty({ description: 'The id of course' })
  id: string;

  @ApiProperty({ description: 'The name of the course' })
  name: string;

  @ApiProperty({ description: 'The code of the course' })
  code: string;

  @ApiProperty({ description: 'The date when the course was created' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  @ApiProperty({ description: 'The date when the course was updated' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updatedAt: Date;

  constructor(output: CourseOutput) {
    this.id = output.id;
    this.name = output.name;
    this.code = output.code;
    this.createdAt = output.createdAt;
    this.updatedAt = output.updatedAt;
  }
}

export class CourseCollectionPresenter extends CollectionPresenter {
  data: CoursePresenter[];

  constructor(output: ListCoursesUsecase.Output) {
    const { items, ...pagination } = output;
    super(pagination);
    this.data = items.map((item) => new CoursePresenter(item));
  }
}
