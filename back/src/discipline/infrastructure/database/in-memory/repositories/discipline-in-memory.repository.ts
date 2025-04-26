import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { DisciplineRepository } from '@/discipline/domain/repositories/discipline.repository';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';

export class DisciplineInMemoryRepository
  extends InMemorySearchableRepository<
    DisciplineEntity,
    DisciplineRepository.Filter
  >
  implements DisciplineRepository.Repository
{
  sortableFields = ['name', 'code', 'createdAt'];

  async search(
    params: DisciplineRepository.SearchParams,
  ): Promise<DisciplineRepository.SearchResult> {
    const itemsFiltered = await this.applyFilters(this.items, params.filter);

    const itemsSorted = await this.applySort(
      itemsFiltered,
      params.sort,
      params.sortDir,
    );

    const itemsPaginated = await this.applyPagination(
      itemsSorted,
      params.page,
      params.perPage,
    );

    return new DisciplineRepository.SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      currentPage: params.page,
      perPage: params.perPage,
      sort: params.sort,
      sortDir: params.sortDir,
      filter: params.filter,
    });
  }

  protected async applyFilters(
    items: DisciplineEntity[],
    filter: DisciplineRepository.Filter | null,
  ): Promise<DisciplineEntity[]> {
    if (!filter) return items;

    return items.filter((discipline) => {
      let matches = true;

      if (filter.name) {
        const nameMatches = discipline.props.name
          .toLowerCase()
          .includes(filter.name.toLowerCase());
        if (!nameMatches) {
          matches = false;
        }
      }

      if (filter.code) {
        const codeMatches = discipline.props.code
          .toLowerCase()
          .includes(filter.code.toLowerCase());
        if (!codeMatches) {
          matches = false;
        }
      }

      if (filter.courseId) {
        const courseIdMatches = discipline.props.courseId === filter.courseId;
        if (!courseIdMatches) {
          matches = false;
        }
      }

      if (filter.coursePeriodId) {
        const coursePeriodIdMatches =
          discipline.props.coursePeriodId === filter.coursePeriodId;
        if (!coursePeriodIdMatches) {
          matches = false;
        }
      }

      return matches;
    });
  }

  protected async applySort(
    items: DisciplineEntity[],
    sort: string | null,
    sortDir: SortOrderEnum | null,
  ): Promise<DisciplineEntity[]> {
    if (!sort) {
      sort = 'createdAt';
    }

    if (!sortDir) {
      sortDir = SortOrderEnum.DESC;
    }

    return super.applySort(items, sort, sortDir);
  }

  protected async _get(id: string): Promise<DisciplineEntity> {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new DisciplineWithIdNotFoundError(id);
    }

    return item;
  }

  protected async _getIndex(id: string): Promise<number> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new DisciplineWithIdNotFoundError(id);
    }

    return index;
  }

  async assureDisciplineExists(disciplineId: string): Promise<void> {
    const exists = this.items.some((item) => item.id === disciplineId);

    if (!exists) {
      throw new DisciplineWithIdNotFoundError(disciplineId);
    }
  }
}
