import { ClassroomOutput } from '@/classroom/application/dtos/classroom-output';
import { Transform } from 'class-transformer';
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ListClassroomsUsecase } from '@/classroom/application/usecases/list-classroom.usecase';
import { ApiProperty } from '@nestjs/swagger';

export class ClassroomPresenter {
  @ApiProperty({ description: 'The id of classroom' })
  id: string;

  @ApiProperty({ description: 'The name of the classroom' })
  name: string;

  @ApiProperty({ description: 'The building (ICEX or CAD3) of classroom' })
  building: string;

  @ApiProperty({ description: 'The date when the classroom was created' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  constructor(output: ClassroomOutput) {
    this.id = output.id;
    this.name = output.name;
    this.building = output.building;
    this.createdAt = output.createdAt;
  }
}

export class ClassroomCollectionPresenter extends CollectionPresenter {
  data: ClassroomPresenter[];

  constructor(output: ListClassroomsUsecase.Output) {
    const { items, ...pagination } = output;
    super(pagination);
    this.data = items.map((item) => new ClassroomPresenter(item));
  }
}
