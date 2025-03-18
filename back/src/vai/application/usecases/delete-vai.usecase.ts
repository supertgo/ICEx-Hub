import { VaiRepository } from '@/vai/domain/repositories/vai.repository';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';

export namespace DeleteVaiUsecase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: VaiRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.repository.delete(input.id);
    }
  }
}
