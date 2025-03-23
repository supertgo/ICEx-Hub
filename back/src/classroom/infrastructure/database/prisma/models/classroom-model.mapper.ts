import { Classroom } from '@prisma/client';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';

export class ClassroomModelMapper {
  static toEntity(model: Classroom): ClassroomEntity {
    const data = { };

    try {
      return new ClassroomEntity(data, model.id);
    } catch {
      throw new ValidationErrors(`Could not load classroom having id ${model.id}`);
    }
  }
}
