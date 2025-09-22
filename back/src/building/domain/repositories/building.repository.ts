import { RepositoryInterface } from '@/shared/domain/repositories/repository-contracts';
import { BuildingEntity } from '@/building/domain/entities/building.entity';
import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';

export namespace BuildingRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<BuildingEntity, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      BuildingEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
  }
}
