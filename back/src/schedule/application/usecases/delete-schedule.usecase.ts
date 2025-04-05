import { ScheduleRepository } from '@/schedule/domain/repositories/schedule.repository';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';

export namespace DeleteScheduleUsecase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: ScheduleRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.repository.delete(input.id);
    }
  }
}
