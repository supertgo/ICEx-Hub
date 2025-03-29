import { CourseRepository } from '@/course/domain/repositories/course.repository';
import { CourseOutput, CourseOutputMapper } from '@/course/application/dtos/course-output';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { CourseEntity } from '@/course/domain/entities/course.entity';

export namespace CreateCourseUsecase {
  export type Input = {
    name: string;
    code: string;
  };

  export type Output = CourseOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: CourseRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = new CourseEntity(input);
      const course = await this.repository.insert(entity);

      return CourseOutputMapper.toOutput(course);
    }
  }
}
