import { CoursePeriod } from '@prisma/client';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';
import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';

export class CoursePeriodModelMapper {
  static toEntity(model: CoursePeriod): CoursePeriodEntity {
    const data = {
      name: model.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    try {
      return new CoursePeriodEntity(data, model.id);
    } catch {
      throw new ValidationErrors(
        `Could not load course period having id ${model.id}`,
      );
    }
  }
}
