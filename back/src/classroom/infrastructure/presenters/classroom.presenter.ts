import { ClassroomOutput } from '@/classroom/application/dtos/classroom-output';
import { Transform } from 'class-transformer';
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ListClassroomsUsecase } from '@/classroom/application/usecases/list-classrooms.usecase';
import { ApiProperty } from '@nestjs/swagger';

export class ClassroomPresenter {
  constructor(output: ClassroomOutput) { }
}

export class ClassroomCollectionPresenter extends CollectionPresenter {
  data: ClassroomPresenter[];

  constructor(output: ListClassroomsUsecase.Output) {
    const { items, ...pagination } = output;
    super(pagination);
    this.data = items.map((item) => new ClassroomPresenter(item));
  }
}
