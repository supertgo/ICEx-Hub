import { DisciplineRepository } from '@/discipline/domain/repositories/discipline.repository';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { SearchInput } from '@/shared/application/dtos/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output';
import { DisciplineOutputMapper } from '@/discipline/application/dtos/discipline-output';

export namespace ListDisciplinesUsecase {
  export type Input = SearchInput;

  export type Output = PaginationOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: DisciplineRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new DisciplineRepository.SearchParams(input);

      const searchResult = await this.repository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: DisciplineRepository.SearchResult): Output {
      const item = searchResult.items.map((discipline) =>
        DisciplineOutputMapper.toOutput(discipline),
      );

      return PaginationOutputMapper.toOutput(item, searchResult);
    }
  }
}
