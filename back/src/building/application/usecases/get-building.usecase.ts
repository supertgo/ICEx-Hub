import { BuildingRepository } from '@/building/domain/repositories/building.repository';
import {
  BuildingOutput,
  BuildingOutputMapper,
} from '@/building/application/dtos/building-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';

export namespace GetBuildingUsecase {
  export type Input = {
    id: string;
  };

  export type Output = BuildingOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: BuildingRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);

      return BuildingOutputMapper.toOutput(entity);
    }
  }
}
