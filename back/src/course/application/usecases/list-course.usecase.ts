import { CourseRepository } from '@/course/domain/repositories/course.repository';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { SearchInput } from '@/shared/application/dtos/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output';
import { CourseOutputMapper } from '@/course/application/dtos/course-output';

export namespace ListCoursesUsecase {
  export type Input = SearchInput;

  export type Output = PaginationOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: CourseRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new CourseRepository.SearchParams(input);

      const searchResult = await this.repository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: CourseRepository.SearchResult): Output {
      const item = searchResult.items.map((course) =>
        CourseOutputMapper.toOutput(course),
      );

      return PaginationOutputMapper.toOutput(item, searchResult);
    }
  }
}
