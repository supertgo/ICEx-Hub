import { BuildingEntity } from '@/building/domain/entities/building.entity';

export type BuildingOutput = ReturnType<BuildingEntity['toJSON']>;

export class BuildingOutputMapper {
  static toOutput(entity: BuildingEntity): BuildingOutput {
    return entity.toJSON();
  }
}
