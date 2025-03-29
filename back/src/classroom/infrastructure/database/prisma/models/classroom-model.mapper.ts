import { Classroom } from '@prisma/client';
import {
  CLASSROOM_BUILDING,
  ClassroomEntity,
} from '@/classroom/domain/entities/classroom.entity';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';

export class ClassroomModelMapper {
  static toEntity(model: Classroom): ClassroomEntity {
    const data = {
      name: model.name,
      building: model.building as CLASSROOM_BUILDING,
      createdAt: model.createdAt,
    };

    try {
      return new ClassroomEntity(data, model.id);
    } catch {
      throw new ValidationErrors(
        `Could not load classroom having id ${model.id}`,
      );
    }
  }
}
