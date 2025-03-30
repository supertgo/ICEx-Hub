import { ScheduleOutput } from '@/schedule/application/dtos/schedule-output';
import { Transform } from 'class-transformer';
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ListSchedulesUsecase } from '@/schedule/application/usecases/list-schedules.usecase';
import { ApiProperty } from '@nestjs/swagger';

export class SchedulePresenter {
  constructor(output: ScheduleOutput) { }
}

export class ScheduleCollectionPresenter extends CollectionPresenter {
  data: SchedulePresenter[];

  constructor(output: ListSchedulesUsecase.Output) {
    const { items, ...pagination } = output;
    super(pagination);
    this.data = items.map((item) => new SchedulePresenter(item));
  }
}
