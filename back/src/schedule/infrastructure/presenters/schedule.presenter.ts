import { ScheduleOutput } from '@/schedule/application/dtos/schedule-output';
import { Transform } from 'class-transformer';
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ListSchedulesUsecase } from '@/schedule/application/usecases/list-schedule.usecase';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClassroomPresenter } from '@/classroom/infrastructure/presenters/classroom.presenter';

export class SchedulePresenter {
  @ApiProperty({ description: 'The id of schedule' })
  id: string;

  @ApiPropertyOptional({ description: 'The discipline of schedule' })
  discipline: {
    id: string;
    name: string;
    code: string;
    courseId: string;
    coursePeriodId: string;
    createdAt?: Date;
    updatedAt?: Date;
  };

  @ApiPropertyOptional({ description: 'The classroom of schedule' })
  classroom: ClassroomPresenter;

  @ApiProperty({ description: 'The days that the schedule will happen' })
  dayPattern: string;

  @ApiProperty({ description: 'The time that the schedule will happen' })
  timeSlot: string;

  @ApiProperty({ description: 'The date when the schedule was created' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  @ApiProperty({ description: 'The date when the schedule was updated' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updatedAt: Date;

  constructor(output: ScheduleOutput) {
    this.id = output.id;
    this.discipline = output.discipline;
    this.classroom =
      output.classroom && new ClassroomPresenter(output.classroom);
    this.dayPattern = output.dayPattern;
    this.timeSlot = output.timeSlot;
    this.createdAt = output.createdAt;
    this.updatedAt = output.updatedAt;
  }
}

export class ScheduleCollectionPresenter extends CollectionPresenter {
  data: SchedulePresenter[];

  constructor(output: ListSchedulesUsecase.Output) {
    const { items, ...pagination } = output;
    super(pagination);
    this.data = items.map((item) => new SchedulePresenter(item));
  }
}
