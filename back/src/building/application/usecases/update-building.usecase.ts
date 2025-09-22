import { BuildingRepository } from '@/building/domain/repositories/building.repository';
import {
  BuildingOutput,
  BuildingOutputMapper,
} from '@/building/application/dtos/building-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

export namespace UpdateBuildingUsecase {
  export type Input = { };

  export type Output = BuildingOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: BuildingRepository.Repository) {}

    async execute(input: Input): Promise<Output> { }
  }
}
