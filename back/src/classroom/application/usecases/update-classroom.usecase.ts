import { ClassroomRepository } from '@/classroom/domain/repositories/classroom.repository';
import {
  ClassroomOutput,
  ClassroomOutputMapper,
} from '@/classroom/application/dtos/classroom-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { CLASSROOM_BUILDING } from '@/classroom/domain/entities/classroom.entity';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

export namespace UpdateClassroomUsecase {
  export type Input = {
    id: string;
    name?: string;
    building?: CLASSROOM_BUILDING;
  };

  export type Output = ClassroomOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: ClassroomRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError(
          'Classroom id is required on UpdateClassroomUsecase',
        );
      }

      const entity = await this.repository.findById(input.id);

      //TODO feat/update-classroom Arthur & Laura | Create update method -> should be able to update name or building
      // entity.update(input);

      return ClassroomOutputMapper.toOutput(entity);
    }
  }
}
