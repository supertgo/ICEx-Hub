import { DisciplineRepository } from '@/discipline/domain/repositories/discipline.repository';
import {
  DisciplineOutput,
  DisciplineOutputMapper,
} from '@/discipline/application/dtos/discipline-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

export namespace UpdateDisciplineUsecase {
  export type Input = { };

  export type Output = DisciplineOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: DisciplineRepository.Repository) {}

    async execute(input: Input): Promise<Output> { }
  }
}
