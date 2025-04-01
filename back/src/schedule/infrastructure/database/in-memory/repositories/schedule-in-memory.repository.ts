import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ScheduleRepository } from '@/schedule/domain/repositories/schedule.repository';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ScheduleWithIdNotFoundError } from '@/schedule/infrastructure/errors/schedule-with-id-not-found-error';
import {
  DayPatternEnum,
  TimeSlotEnum,
} from '@/schedule/domain/schedule.constants';

export class ScheduleInMemoryRepository
  extends InMemorySearchableRepository<ScheduleEntity>
  implements ScheduleRepository.Repository
{
  sortableFields = ['createdAt'];

  protected async applyFilters(
    items: ScheduleEntity[],
    filter: string | TimeSlotEnum | DayPatternEnum | null,
  ): Promise<ScheduleEntity[]> {
    if (!filter) return items;

    return items.filter((item) =>
      item.props.timeSlot.toLowerCase().includes(filter.toLowerCase()),
    );
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
