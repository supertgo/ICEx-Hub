import { ClassroomRepository } from '@/classroom/domain/repositories/classroom.repository';
import {
  ClassroomOutput,
  ClassroomOutputMapper,
} from '@/classroom/application/dtos/classroom-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

export namespace UpdateClassroomUsecase {
  export type Input = { };

  export type Output = ClassroomOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: ClassroomRepository.Repository) {}

    async execute(input: Input): Promise<Output> { }
  }
}
