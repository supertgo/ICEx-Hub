import { CourseEntity } from '@/course/domain/entities/course.entity';
import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '@/shared/domain/repositories/searchable-repository-contracts';

export namespace CourseRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<CourseEntity, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      CourseEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
  }
}
