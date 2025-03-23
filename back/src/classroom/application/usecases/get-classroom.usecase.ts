import { ClassroomRepository } from '@/classroom/domain/repositories/classroom.repository';
import {
  ClassroomOutput,
  ClassroomOutputMapper,
} from '@/classroom/application/dtos/classroom-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';

export namespace GetClassroomUsecase {
  export type Input = {
    id: string;
  };

  export type Output = ClassroomOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: ClassroomRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);

      return ClassroomOutputMapper.toOutput(entity);
    }
  }
}
