import { RepositoryInterface } from '@/shared/domain/repositories/repository-contracts';
import { NewEntityEntity } from '@/new-entity/domain/entities/new-entity.entity';
import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';

export namespace NewEntityRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<NewEntityEntity, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      NewEntityEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
  }
}
