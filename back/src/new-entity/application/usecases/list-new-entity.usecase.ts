import { NewEntityRepository } from '@/new-entity/domain/repositories/new-entity.repository';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { SearchInput } from '@/shared/application/dtos/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output';
import { NewEntityOutputMapper } from '@/new-entity/application/dtos/new-entity-output';

export namespace ListNewEntitysUsecase {
  export type Input = SearchInput;

  export type Output = PaginationOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: NewEntityRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new NewEntityRepository.SearchParams(input);

      const searchResult = await this.repository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: NewEntityRepository.SearchResult): Output {
      const item = searchResult.items.map((new-entity) =>
        NewEntityOutputMapper.toOutput(new-entity),
      );

      return PaginationOutputMapper.toOutput(item, searchResult);
    }
  }
}
