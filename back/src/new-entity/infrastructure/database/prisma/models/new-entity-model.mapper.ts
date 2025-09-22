import { NewEntity } from '@prisma/client';
import { NewEntityEntity } from '@/new-entity/domain/entities/new-entity.entity';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';

export class NewEntityModelMapper {
  static toEntity(model: NewEntity): NewEntityEntity {
    const data = { };

    try {
      return new NewEntityEntity(data, model.id);
    } catch {
      throw new ValidationErrors(`Could not load new-entity having id ${model.id}`);
    }
  }
}
