import { ClassroomOutput } from '@/classroom/application/dtos/classroom-output';
import {
  DisciplineProps,
  ScheduleEntity,
} from '@/schedule/domain/entities/schedule.entity';

export type ScheduleOutput = {
  id: string;
  discipline: DisciplineProps;
  classroom: ClassroomOutput | null;
  dayPattern: string;
  timeSlot: string;
  class: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class ScheduleOutputMapper {
  static toOutput(entity: ScheduleEntity): ScheduleOutput {
    return entity.toJSON();
  }
}
