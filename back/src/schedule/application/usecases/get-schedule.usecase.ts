import { ScheduleRepository } from '@/schedule/domain/repositories/schedule.repository';
import {
  ScheduleOutput,
  ScheduleOutputMapper,
} from '@/schedule/application/dtos/schedule-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';

export namespace GetScheduleUsecase {
  export type Input = {
    id: string;
  };

  export type Output = ScheduleOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: ScheduleRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);

      return ScheduleOutputMapper.toOutput(entity);
    }
  }
}
