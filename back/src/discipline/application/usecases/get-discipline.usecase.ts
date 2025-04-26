import { DisciplineRepository } from '@/discipline/domain/repositories/discipline.repository';
import {
  DisciplineOutput,
  DisciplineOutputMapper,
} from '@/discipline/application/dtos/discipline-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';

export namespace GetDisciplineUsecase {
  export type Input = {
    id: string;
  };

  export type Output = DisciplineOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: DisciplineRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);

      return DisciplineOutputMapper.toOutput(entity);
    }
  }
}
