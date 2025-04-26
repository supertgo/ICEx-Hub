import { RepositoryInterface } from '@/shared/domain/repositories/repository-contracts';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';

export namespace DisciplineRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<DisciplineEntity, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      DisciplineEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
  }
}
