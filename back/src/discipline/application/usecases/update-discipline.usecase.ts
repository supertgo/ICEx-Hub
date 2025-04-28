import type { DisciplineRepository } from '@/discipline/domain/repositories/discipline.repository';
import {
  DisciplineOutput,
  DisciplineOutputMapper,
} from '@/discipline/application/dtos/discipline-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { AbstractUseCase } from '@/shared/application/use-cases/abstract-use-case';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';

export namespace UpdateDisciplineUsecase {
  export type Input = {
    id: string;
    name?: string;
    code?: string;
  };

  export type Output = DisciplineOutput;

  export class UseCase
    extends AbstractUseCase<Input, Output>
    implements UseCaseInterface<Input, Output>
  {
    constructor(private repository: DisciplineRepository.Repository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      this.assureRequiredInputProvided(input, ['id']);

      const discipline = await this.repository.findById(input.id);

      if (!discipline) {
        throw new DisciplineWithIdNotFoundError(input.id);
      }

      discipline.props.name = input.name ?? discipline.props.name;
      discipline.props.code = input.code ?? discipline.props.code;

      await this.repository.update(discipline);
      return DisciplineOutputMapper.toOutput(discipline);
    }
  }
}
