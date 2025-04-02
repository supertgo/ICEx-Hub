import { ClassroomOutput } from '@/classroom/application/dtos/classroom-output';
import {
  DisciplineProps,
  ScheduleEntity,
} from '@/schedule/domain/entities/schedule.entity';

export type ScheduleOutput = {
  id: string;
  disciplineId: string;
  discipline?: DisciplineProps;
  classroomId: string;
  classroom?: ClassroomOutput | null;
  dayPattern: string;
  timeSlot: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class ScheduleOutputMapper {
  static toOutput(entity: ScheduleEntity): ScheduleOutput {
    return entity.toJSON();
  }
}
