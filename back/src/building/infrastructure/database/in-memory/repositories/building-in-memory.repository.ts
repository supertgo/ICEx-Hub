import { BuildingEntity } from '@/building/domain/entities/building.entity';
import { BuildingRepository } from '@/building/domain/repositories/building.repository';
import { BuildingWithEmailNotFoundError } from '@/building/domain/errors/building-with-email-not-found-error';
import { EmailAlreadyInUseError } from '@/building/domain/errors/email-already-in-use-error';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { BuildingWithIdNotFoundError } from '@/building/infrastructure/errors/building-with-id-not-found-error';

export class BuildingInMemoryRepository
  extends InMemorySearchableRepository<BuildingEntity>
  implements BuildingRepository.Repository
{
  sortableFields = [];

  protected async applyFilters(
    items: BuildingEntity[],
    filter: string | null,
  ): Promise<BuildingEntity[]> {
    if (!filter) return items;

    return items.filter((item) =>
      item.props.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  protected async applySort(
    items: BuildingEntity[],
    sort: string | null,
    sortDir: SortOrderEnum | null,
  ): Promise<BuildingEntity[]> {
    if (!sort) {
      sort = 'createdAt';
    }

    if (!sortDir) {
      sortDir = SortOrderEnum.DESC;
    }

    return super.applySort(items, sort, sortDir);
  }

  protected async _get(id: string): Promise<BuildingEntity> {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new BuildingWithIdNotFoundError(id);
    }

    return item;
  }

  protected async _getIndex(id: string): Promise<number> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new BuildingWithIdNotFoundError(id);
    }

    return index;
  }
}
