import { Discipline } from '@prisma/client';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';

export class DisciplineModelMapper {
  static toEntity(model: Discipline): DisciplineEntity {
    const data = { };

    try {
      return new DisciplineEntity(data, model.id);
    } catch {
      throw new ValidationErrors(`Could not load discipline having id ${model.id}`);
    }
  }
}
