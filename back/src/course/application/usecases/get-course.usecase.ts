import { CourseRepository } from '@/course/domain/repositories/course.repository';
import {
  CourseOutput,
  CourseOutputMapper,
} from '@/course/application/dtos/course-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';

export namespace GetCourseUsecase {
  export type Input = {
    id: string;
  };

  export type Output = CourseOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: CourseRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);

      return CourseOutputMapper.toOutput(entity);
    }
  }
}
