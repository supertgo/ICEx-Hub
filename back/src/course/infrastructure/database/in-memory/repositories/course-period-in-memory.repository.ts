import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { CoursePeriodWithIdNotFoundError } from '@/course/infrastructure/Errors/course-period-with-id-not-found-error';
import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';
import { CoursePeriodRepository } from '@/course/domain/repositories/course-period.repository';

export class CoursePeriodInMemoryRepository
  extends InMemorySearchableRepository<CoursePeriodEntity>
  implements CoursePeriodRepository.Repository
{
  assureCoursePeriodExists(coursePeriodId: string): Promise<void> {
    return this.items.indexOf(
      this.items.find((item) => item.id === coursePeriodId),
    ) > -1
      ? Promise.resolve()
      : Promise.reject(new CoursePeriodWithIdNotFoundError(coursePeriodId));
  }

  sortableFields = ['name', 'createdAt'];

  protected async applyFilters(
    items: CoursePeriodEntity[],
    filter: string | null,
  ): Promise<CoursePeriodEntity[]> {
    if (!filter) return items;

    return items.filter((item) =>
      item.props.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  protected async applySort(
    items: CoursePeriodEntity[],
    sort: string | null,
    sortDir: SortOrderEnum | null,
  ): Promise<CoursePeriodEntity[]> {
    if (!sort) {
      sort = 'name';
    }

    if (!sortDir) {
      sortDir = SortOrderEnum.ASC;
    }

    return super.applySort(items, sort, sortDir);
  }

  protected async _get(id: string): Promise<CoursePeriodEntity> {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new CoursePeriodWithIdNotFoundError(id);
    }

    return item;
  }

  protected async _getIndex(id: string): Promise<number> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new CoursePeriodWithIdNotFoundError(id);
    }

    return index;
  }
}
