import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';

export namespace ScheduleRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<
    ScheduleEntity,
    Filter
  > {}

  export type Repository = SearchableRepositoryInterface<
    ScheduleEntity,
    Filter,
    SearchParams,
    SearchResult
  >;
}
