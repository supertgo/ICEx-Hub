import { Schedule } from '@prisma/client';
import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';
import {
  DayPatternEnum,
  TimeSlotEnum,
} from '@/schedule/domain/schedule.constants';

export class ScheduleModelMapper {
  static toEntity(model: Schedule): ScheduleEntity {
    const data = {
      disciplineId: model.disciplineId,
      classroomId: model.classroomId,
      dayPattern: model.dayPattern as DayPatternEnum,
      timeSlot: model.timeSlot as TimeSlotEnum,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    try {
      return new ScheduleEntity(data, model.id);
    } catch {
      throw new ValidationErrors(
        `Could not load schedule having id ${model.id}`,
      );
    }
  }
}
