import { ClassroomRepository } from '@/classroom/domain/repositories/classroom.repository';
import {
  ClassroomOutput,
  ClassroomOutputMapper,
} from '@/classroom/application/dtos/classroom-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { CLASSROOM_BUILDING } from '@/classroom/domain/classroom.constants';
import { AbstractUseCase } from '@/shared/application/use-cases/abstract-use-case';

export namespace UpdateClassroomUsecase {
  export type Input = {
    id: string;
    name?: string;
    building?: 'ICEX' | 'CAD3';
  };

  export type Output = ClassroomOutput;

  export class UseCase
    extends AbstractUseCase<Input, Output>
    implements UseCaseInterface<Input, Output>
  {
    constructor(private repository: ClassroomRepository.Repository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      this.assureRequiredInputProvided(input, ['id']);

      const entity = await this.repository.findById(input.id);

      if (input.name) {
        entity.updateName(input.name);
      }

      if (input.building) {
        if (
          !Object.values(CLASSROOM_BUILDING).includes(
            input.building as CLASSROOM_BUILDING,
          )
        ) {
          throw new BadRequestError(
            `Invalid classroom building: ${input.building}`,
          );
        } else {
          entity.updateBuilding(input.building as CLASSROOM_BUILDING);
        }
      }

      await this.repository.update(entity);

      return ClassroomOutputMapper.toOutput(entity);
    }
  }
}
