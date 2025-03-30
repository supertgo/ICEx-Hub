import { CourseRepository } from '@/course/domain/repositories/course.repository';
import { CourseOutput } from '@/course/application/dtos/course-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';

export namespace UpdateCourseUsecase {
  export type Input = {};

  export type Output = void;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: CourseRepository.Repository) {
    }

    //todo Laura
    async execute(input: Input): Promise<void> {
    }
  }
}
