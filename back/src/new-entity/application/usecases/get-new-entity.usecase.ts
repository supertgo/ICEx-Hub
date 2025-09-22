import { NewEntityRepository } from '@/new-entity/domain/repositories/new-entity.repository';
import {
  NewEntityOutput,
  NewEntityOutputMapper,
} from '@/new-entity/application/dtos/new-entity-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';

export namespace GetNewEntityUsecase {
  export type Input = {
    id: string;
  };

  export type Output = NewEntityOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: NewEntityRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);

      return NewEntityOutputMapper.toOutput(entity);
    }
  }
}
