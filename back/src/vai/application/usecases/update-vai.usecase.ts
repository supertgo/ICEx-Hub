import { VaiRepository } from '@/vai/domain/repositories/vai.repository';
import {
  VaiOutput,
  VaiOutputMapper,
} from '@/vai/application/dtos/vai-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

export namespace UpdateVaiUsecase {
  export type Input = {
    id: string;
    name: string;
  };

  export type Output = VaiOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: VaiRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.name) {
        throw new BadRequestError('Name is required');
      }

      const entity = await this.repository.findById(input.id);

      entity.update(input.name);
      await this.repository.update(entity);

      return VaiOutputMapper.toOutput(entity);
    }
  }
}
