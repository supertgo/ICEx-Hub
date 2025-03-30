import { Course } from '@prisma/client';
import { CourseEntity } from '@/course/domain/entities/course.entity';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';

export class CourseModelMapper {
  static toEntity(model: Course): CourseEntity {
    const data = {
      code: model.code,
      name: model.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    try {
      return new CourseEntity(data, model.id);
    } catch {
      throw new ValidationErrors(`Could not load course having id ${model.id}`);
    }
  }
}
