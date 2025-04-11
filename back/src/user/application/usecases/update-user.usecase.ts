import { UserRepository } from '@/user/domain/repositories/user.repository';
import {
  UserOutput,
  UserOutputMapper,
} from '@/user/application/dtos/user-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { AbstractUseCase } from '@/shared/application/use-cases/abstract-use-case';

export namespace UpdateUserUsecase {
  export type Input = {
    id: string;
    name: string;
  };

  export type Output = UserOutput;

  export class UseCase
    extends AbstractUseCase<Input, Output>
    implements UseCaseInterface<Input, Output>
  {
    constructor(private repository: UserRepository.Repository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      this.assureRequiredInputProvided(input, ['name']);

      const entity = await this.repository.findById(input.id);

      entity.update(input.name);
      await this.repository.update(entity);

      return UserOutputMapper.toOutput(entity);
    }
  }
}
