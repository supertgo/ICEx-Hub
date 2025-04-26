import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { DisciplineRepository } from '@/discipline/domain/repositories/discipline.repository';
import { DisciplineWithEmailNotFoundError } from '@/discipline/domain/errors/discipline-with-email-not-found-error';
import { EmailAlreadyInUseError } from '@/discipline/domain/errors/email-already-in-use-error';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';

export class DisciplineInMemoryRepository
  extends InMemorySearchableRepository<DisciplineEntity>
  implements DisciplineRepository.Repository
{
  sortableFields = [];

  protected async applyFilters(
    items: DisciplineEntity[],
    filter: string | null,
  ): Promise<DisciplineEntity[]> {
    if (!filter) return items;

    return items.filter((item) =>
      item.props.name.toLowerCase().includes(filter.toLowerCase()),
    );
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
}
