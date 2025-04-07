import { ScheduleRepository } from '@/schedule/domain/repositories/schedule.repository';
import {
  ScheduleOutput,
  ScheduleOutputMapper,
} from '@/schedule/application/dtos/schedule-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

export namespace UpdateScheduleUsecase {
  export type Input = {
    id: string;
    classroomId?: string;
    disciplineId?: string;
  };

  export type Output = ScheduleOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: ScheduleRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError(
          'Schedule id is required on UpdateScheduleUsecase',
        );
      }

      const entity = await this.repository.findById(input.id);

      return ScheduleOutputMapper.toOutput(entity);
    }
  }
}
