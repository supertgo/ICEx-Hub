import { Classroom, Discipline, Schedule } from '@prisma/client';
import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';
import {
  DayPatternEnum,
  TimeSlotEnum,
} from '@/schedule/domain/schedule.constants';
import { ClassroomModelMapper } from '@/classroom/infrastructure/database/prisma/models/classroom-model.mapper';

type ScheduleWithRelations = Schedule & {
  classroom?: Classroom;
  discipline?: Discipline;
};

export class ScheduleModelMapper {
  static toEntity(model: ScheduleWithRelations): ScheduleEntity {
    const data = {
      disciplineId: model.disciplineId,
      classroomId: model.classroomId,
      classroom:
        model.classroom && ClassroomModelMapper.toEntity(model.classroom),
      discipline: model.discipline && {
        id: model.discipline.id,
        name: model.discipline.name,
        code: model.discipline.code,
        courseId: model.discipline.courseId,
        coursePeriodId: model.discipline.coursePeriodId,
        createdAt: model.discipline.createdAt,
        updatedAt: model.discipline.updatedAt,
      },
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
