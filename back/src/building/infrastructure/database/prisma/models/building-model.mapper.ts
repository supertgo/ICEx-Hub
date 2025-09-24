import { Building } from '@prisma/client';
import { BuildingEntity } from '@/building/domain/entities/building.entity';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';

export class BuildingModelMapper {
  static toEntity(model: Building): BuildingEntity {
    const data = { };

    try {
      return new BuildingEntity(data, model.id);
    } catch {
      throw new ValidationErrors(`Could not load building having id ${model.id}`);
    }
  }
}
