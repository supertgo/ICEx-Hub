import { DisciplineRepository } from '@/discipline/domain/repositories/discipline.repository';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';

export namespace DeleteDisciplineUsecase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: DisciplineRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.repository.delete(input.id);
    }
  }
}
