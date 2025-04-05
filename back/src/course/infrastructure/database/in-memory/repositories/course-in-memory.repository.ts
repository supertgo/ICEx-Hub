import { CourseEntity } from '@/course/domain/entities/course.entity';
import { CourseRepository } from '@/course/domain/repositories/course.repository';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { CourseWithIdNotFoundError } from '@/course/infrastructure/errors/course-with-id-not-found-error';

export class CourseInMemoryRepository
  extends InMemorySearchableRepository<CourseEntity>
  implements CourseRepository.Repository
{
  assureCourseExists(courseId: string): Promise<void> {
    return this.items.indexOf(this.items.find((item) => item.id === courseId)) >
      -1
      ? Promise.resolve()
      : Promise.reject(new CourseWithIdNotFoundError(courseId));
  }

  sortableFields = ['createdAt', 'name', 'code'];

  protected async applyFilters(
    items: CourseEntity[],
    filter: string | null,
  ): Promise<CourseEntity[]> {
    if (!filter) return items;

    return items.filter((item) =>
      item.props.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  protected async applySort(
    items: CourseEntity[],
    sort: string | null,
    sortDir: SortOrderEnum | null,
  ): Promise<CourseEntity[]> {
    if (!sort) {
      sort = 'createdAt';
    }

    if (!sortDir) {
      sortDir = SortOrderEnum.DESC;
    }

    return super.applySort(items, sort, sortDir);
  }

  protected async _get(id: string): Promise<CourseEntity> {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new CourseWithIdNotFoundError(id);
    }

    return item;
  }

  protected async _getIndex(id: string): Promise<number> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new CourseWithIdNotFoundError(id);
    }

    return index;
  }
}
