import { ScheduleRepository } from '@/schedule/domain/repositories/schedule.repository';
import {
  ScheduleOutput,
  ScheduleOutputMapper,
} from '@/schedule/application/dtos/schedule-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { AbstractUseCase } from '@/shared/application/use-cases/abstract-use-case';

export namespace UpdateScheduleUsecase {
  export type Input = {
    id: string;
    classroomId?: string;
    disciplineId?: string;
  };

  export type Output = ScheduleOutput;

  export class UseCase
    extends AbstractUseCase<Input, Output>
    implements UseCaseInterface<Input, Output>
  {
    constructor(private repository: ScheduleRepository.Repository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      this.assureRequiredInputProvided(input, ['id']);

      const entity = await this.repository.findById(input.id);

      return ScheduleOutputMapper.toOutput(entity);
    }
  }
}
