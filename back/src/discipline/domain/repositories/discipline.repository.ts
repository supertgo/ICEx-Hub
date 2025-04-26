import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '@/shared/domain/repositories/searchable-repository-contracts';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';

export namespace DisciplineRepository {
  export type Filter = {
    name?: string;
    code?: string;
    courseId?: string;
    coursePeriodId?: string;
  };

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<
    DisciplineEntity,
    Filter
  > {}

  export interface Repository
    extends SearchableRepositoryInterface<
      DisciplineEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
    assureDisciplineExists(disciplineId: string): Promise<void>;
  }
}
