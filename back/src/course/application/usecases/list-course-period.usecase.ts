import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { SearchInput } from '@/shared/application/dtos/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output';
import { CoursePeriodRepository } from '@/course/domain/repositories/course-period.repository';
import { CoursePeriodOutputMapper } from '@/course/application/dtos/course-period-output';
import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';

export namespace ListCoursePeriodUsecase {
  export type Input = SearchInput;

  export type Output = PaginationOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: CoursePeriodRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new CoursePeriodRepository.SearchParams(input);

      const searchResult = await this.repository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(
      searchResult: CoursePeriodRepository.SearchResult,
    ): Output {
      const item = searchResult.items.map((coursePeriod: CoursePeriodEntity) =>
        CoursePeriodOutputMapper.toOutput(coursePeriod),
      );

      return PaginationOutputMapper.toOutput(item, searchResult);
    }
  }
}
