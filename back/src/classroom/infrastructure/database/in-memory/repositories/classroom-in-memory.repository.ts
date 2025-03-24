import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { ClassroomRepository } from '@/classroom/domain/repositories/classroom.repository';
import { ClassroomWithIdNotFoundError } from '@/classroom/infrastructure/errors/classroom-with-id-not-found';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

export class ClassroomInMemoryRepository
  extends InMemorySearchableRepository<ClassroomEntity>
  implements ClassroomRepository.Repository
{
  sortableFields = [];

  protected async applyFilters(
    items: ClassroomEntity[],
    filter: string | null,
  ): Promise<ClassroomEntity[]> {
    if (!filter) return items;

    return items.filter((item) =>
      item.props.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  protected async applySort(
    items: ClassroomEntity[],
    sort: string | null,
    sortDir: SortOrderEnum | null,
  ): Promise<ClassroomEntity[]> {
    if (!sort) {
      sort = 'createdAt';
    }

    if (!sortDir) {
      sortDir = SortOrderEnum.DESC;
    }

    return super.applySort(items, sort, sortDir);
  }

  protected async _get(id: string): Promise<ClassroomEntity> {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new ClassroomWithIdNotFoundError(id);
    }

    return item;
  }

  protected async _getIndex(id: string): Promise<number> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new ClassroomWithIdNotFoundError(id);
    }

    return index;
  }
}
