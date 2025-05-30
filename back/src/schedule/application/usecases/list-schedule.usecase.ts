import { ScheduleRepository } from '@/schedule/domain/repositories/schedule.repository';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { SearchInput } from '@/shared/application/dtos/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output';
import {
  ScheduleOutput,
  ScheduleOutputMapper,
} from '@/schedule/application/dtos/schedule-output';

export namespace ListSchedulesUsecase {
  type Filter = {
    name?: string;
    timeSlots?: string[];
    dayPatterns?: string[];
    courseId?: string;
    coursePeriodId?: string;
    class?: string;
  };

  export type Input = SearchInput<Filter>;

  export type Output = PaginationOutput<ScheduleOutput>;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: ScheduleRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new ScheduleRepository.SearchParams(input);

      const searchResult = await this.repository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: ScheduleRepository.SearchResult): Output {
      const item = searchResult.items.map((schedule) =>
        ScheduleOutputMapper.toOutput(schedule),
      );

      return PaginationOutputMapper.toOutput<ScheduleOutput, Filter>(
        item,
        searchResult,
      );
    }
  }
}
