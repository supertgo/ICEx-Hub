import { VaiRepository } from '@/vai/domain/repositories/vai.repository';
import {
  VaiOutput,
  VaiOutputMapper,
} from '@/vai/application/dtos/vai-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';

export namespace GetVaiUsecase {
  export type Input = {
    id: string;
  };

  export type Output = VaiOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: VaiRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);

      return VaiOutputMapper.toOutput(entity);
    }
  }
}
