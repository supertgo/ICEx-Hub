import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';

export type DisciplineOutput = {

}

export class DisciplineOutputMapper {
  static toOutput(entity: DisciplineEntity): DisciplineOutput {
    return entity.toJSON();
  }
}
