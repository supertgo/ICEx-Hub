import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '@/shared/domain/repositories/searchable-repository-contracts';
import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';

export namespace CoursePeriodRepository {
  export type Filter = {
    name?: string;
    courseId?: string;
  };

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<
    CoursePeriodEntity,
    Filter
  > {}

  export interface Repository
    extends SearchableRepositoryInterface<
      CoursePeriodEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
    assureCoursePeriodExists(coursePeriodId: string): Promise<void>;
  }
}
