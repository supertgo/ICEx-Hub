import { Vai } from '@/vai/domain/entities/vai.entity';

export type VaiOutput = {

}

export class VaiOutputMapper {
  static toOutput(entity: VaiEntity): VaiOutput {
    return entity.toJSON();
  }
}
