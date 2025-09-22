import { NewEntityEntity } from '@/new-entity/domain/entities/new-entity.entity';

export type NewEntityOutput = {

}

export class NewEntityOutputMapper {
  static toOutput(entity: NewEntityEntity): NewEntityOutput {
    return entity.toJSON();
  }
}
