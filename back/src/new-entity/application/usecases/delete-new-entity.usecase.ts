import { NewEntityRepository } from '@/new-entity/domain/repositories/new-entity.repository';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';

export namespace DeleteNewEntityUsecase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: NewEntityRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.repository.delete(input.id);
    }
  }
}
