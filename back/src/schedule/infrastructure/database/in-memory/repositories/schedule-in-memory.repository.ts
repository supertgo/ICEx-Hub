import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ScheduleRepository } from '@/schedule/domain/repositories/schedule.repository';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ScheduleWithIdNotFoundError } from '@/schedule/infrastructure/errors/schedule-with-id-not-found-error';

export class ScheduleInMemoryRepository
  extends InMemorySearchableRepository<
    ScheduleEntity,
    ScheduleRepository.Filter
  >
  implements ScheduleRepository.Repository
{
  sortableFields = ['createdAt'];

  async search(
    params: ScheduleRepository.SearchParams,
  ): Promise<ScheduleRepository.SearchResult> {
    const itemFiltered = await this.applyFilters(this.items, params.filter);

    const itemSorted = await this.applySort(
      itemFiltered,
      params.sort,
      params.sortDir,
    );

    const itemsPaginated = await this.applyPagination(
      itemSorted,
      params.page,
      params.perPage,
    );

    return new ScheduleRepository.SearchResult({
      items: itemsPaginated,
      total: itemFiltered.length,
      currentPage: params.page,
      perPage: params.perPage,
      sort: params.sort,
      sortDir: params.sortDir,
      filter: params.filter,
    });
  }

  protected async applyFilters(
    items: ScheduleEntity[],
    filter: ScheduleRepository.Filter | null,
  ): Promise<ScheduleEntity[]> {
    if (!filter) return items;

    return items.filter((item) => {
      return (
        item.props.discipline.name === filter.name &&
        item.props.classroom.name === filter.name
      );
    });
  }

  protected async applySort(
    items: ScheduleEntity[],
    sort: string | null,
    sortDir: SortOrderEnum | null,
  ): Promise<ScheduleEntity[]> {
    if (!sort) {
      sort = 'createdAt';
    }

    if (!sortDir) {
      sortDir = SortOrderEnum.DESC;
    }

    return super.applySort(items, sort, sortDir);
  }

  protected async _get(id: string): Promise<ScheduleEntity> {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new ScheduleWithIdNotFoundError(id);
    }

    return item;
  }

  protected async _getIndex(id: string): Promise<number> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new ScheduleWithIdNotFoundError(id);
    }

    return index;
  }
}
