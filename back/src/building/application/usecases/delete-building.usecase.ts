import { BuildingRepository } from '@/building/domain/repositories/building.repository';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';

export namespace DeleteBuildingUsecase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: BuildingRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.repository.delete(input.id);
    }
  }
}
