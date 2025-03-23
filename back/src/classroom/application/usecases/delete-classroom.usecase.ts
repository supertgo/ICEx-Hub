import { ClassroomRepository } from '@/classroom/domain/repositories/classroom.repository';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';

export namespace DeleteClassroomUsecase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: ClassroomRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.repository.delete(input.id);
    }
  }
}
