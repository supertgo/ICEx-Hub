import { BuildingRepository } from '@/building/domain/repositories/building.repository';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { SearchInput } from '@/shared/application/dtos/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output';
import { BuildingOutputMapper } from '@/building/application/dtos/building-output';

export namespace ListBuildingsUsecase {
  export type Input = SearchInput;

  export type Output = PaginationOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: BuildingRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new BuildingRepository.SearchParams(input);

      const searchResult = await this.repository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: BuildingRepository.SearchResult): Output {
      const item = searchResult.items.map((building) =>
        BuildingOutputMapper.toOutput(building),
      );

      return PaginationOutputMapper.toOutput(item, searchResult);
    }
  }
}
