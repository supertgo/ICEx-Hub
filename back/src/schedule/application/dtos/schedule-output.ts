import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';

export type ScheduleOutput = {

}

export class ScheduleOutputMapper {
  static toOutput(entity: ScheduleEntity): ScheduleOutput {
    return entity.toJSON();
  }
}
