import { Schedule } from '@prisma/client';
import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';

export class ScheduleModelMapper {
  static toEntity(model: Schedule): ScheduleEntity {
    const data = { };

    try {
      return new ScheduleEntity(data, model.id);
    } catch {
      throw new ValidationErrors(`Could not load schedule having id ${model.id}`);
    }
  }
}
