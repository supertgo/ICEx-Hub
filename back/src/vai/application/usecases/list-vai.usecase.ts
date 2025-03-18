import { VaiRepository } from '@/vai/domain/repositories/vai.repository';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { SearchInput } from '@/shared/application/dtos/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output';
import { VaiOutputMapper } from '@/vai/application/dtos/vai-output';

export namespace ListVaisUsecase {
  export type Input = SearchInput;

  export type Output = PaginationOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: VaiRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new VaiRepository.SearchParams(input);

      const searchResult = await this.repository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: VaiRepository.SearchResult): Output {
      const item = searchResult.items.map((vai) =>
        VaiOutputMapper.toOutput(vai),
      );

      return PaginationOutputMapper.toOutput(item, searchResult);
    }
  }
}
