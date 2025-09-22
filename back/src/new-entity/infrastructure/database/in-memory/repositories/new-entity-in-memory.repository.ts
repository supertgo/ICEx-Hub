import { NewEntityEntity } from '@/new-entity/domain/entities/new-entity.entity';
import { NewEntityRepository } from '@/new-entity/domain/repositories/new-entity.repository';
import { NewEntityWithEmailNotFoundError } from '@/new-entity/domain/errors/new-entity-with-email-not-found-error';
import { EmailAlreadyInUseError } from '@/new-entity/domain/errors/email-already-in-use-error';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { NewEntityWithIdNotFoundError } from '@/new-entity/infrastructure/errors/new-entity-with-id-not-found-error';

export class NewEntityInMemoryRepository
  extends InMemorySearchableRepository<NewEntityEntity>
  implements NewEntityRepository.Repository
{
  sortableFields = [];

  protected async applyFilters(
    items: NewEntityEntity[],
    filter: string | null,
  ): Promise<NewEntityEntity[]> {
    if (!filter) return items;

    return items.filter((item) =>
      item.props.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  protected async applySort(
    items: NewEntityEntity[],
    sort: string | null,
    sortDir: SortOrderEnum | null,
  ): Promise<NewEntityEntity[]> {
    if (!sort) {
      sort = 'createdAt';
    }

    if (!sortDir) {
      sortDir = SortOrderEnum.DESC;
    }

    return super.applySort(items, sort, sortDir);
  }

  protected async _get(id: string): Promise<NewEntityEntity> {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NewEntityWithIdNotFoundError(id);
    }

    return item;
  }

  protected async _getIndex(id: string): Promise<number> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NewEntityWithIdNotFoundError(id);
    }

    return index;
  }
}
