import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';

export namespace ClassroomRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<
    ClassroomEntity,
    Filter
  > {}

  export type Repository = SearchableRepositoryInterface<
    ClassroomEntity,
    Filter,
    SearchParams,
    SearchResult
  >;
}
