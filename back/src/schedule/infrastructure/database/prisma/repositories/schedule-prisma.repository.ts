import { Prisma } from '@prisma/client';
import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ScheduleRepository } from '@/schedule/domain/repositories/schedule.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { ScheduleWithIdNotFoundError } from '@/schedule/infrastructure/errors/schedule-with-id-not-found-error';
import { ScheduleModelMapper } from '@/schedule/infrastructure/database/prisma/models/schedule-model.mapper';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ClassroomRepository } from '@/classroom/domain/repositories/classroom.repository';

export class SchedulePrismaRepository implements ScheduleRepository.Repository {
  constructor(private prismaService: PrismaService) {}

  sortableFields: string[];

  async search(
    searchInput: ScheduleRepository.SearchParams,
  ): Promise<ScheduleRepository.SearchResult> {
    const sortable = this.sortableFields.includes(searchInput.sort) || false;
    const field = sortable ? searchInput.sort : 'createdAt';
    const orderBy = sortable ? searchInput.sortDir : SortOrderEnum.DESC;
    //
    // const hasFilter = searchInput.filter ? searchInput.filter : null;
    //
    const whereFilter: Prisma.ScheduleWhereInput = {};

    const { count, models } = await this.executeQueries(
      whereFilter,
      searchInput,
      field,
      orderBy,
    );

    return new ScheduleRepository.SearchResult({
      items: models.map(ScheduleModelMapper.toEntity),
      total: count,
      currentPage:
        searchInput.page && searchInput.page > 0 ? searchInput.page : 1,
      perPage:
        searchInput.perPage && searchInput.perPage > 0
          ? searchInput.perPage
          : 10,
      sort: searchInput.sort,
      sortDir: searchInput.sortDir,
      filter: searchInput.filter,
    });
  }

  private async executeQueries(
    whereFilter: Prisma.ScheduleWhereInput,
    searchInput: ClassroomRepository.SearchParams,
    field: string,
    orderBy: SortOrderEnum,
  ) {
    const [count, models] = await Promise.all([
      this.prismaService.schedule.count({
        where: whereFilter,
      }),
      this.prismaService.schedule.findMany({
        skip:
          (searchInput.page && searchInput.page > 0
            ? searchInput.page - 1
            : 0) *
          (searchInput.perPage && searchInput.perPage > 0
            ? searchInput.perPage
            : 10),
        take:
          searchInput.perPage && searchInput.perPage > 0
            ? searchInput.perPage
            : 10,
        orderBy: {
          [field]: orderBy,
        },
      }),
    ]);

    return { count, models };
  }
  async insert(entity: ScheduleEntity): Promise<ScheduleEntity> {
    const schedule = await this.prismaService.schedule.create({
      data: entity.toJSON(),
    });

    return ScheduleModelMapper.toEntity(schedule);
  }

  findById(id: string): Promise<ScheduleEntity> {
    return this._get(id);
  }

  async findAll(): Promise<ScheduleEntity[]> {
    const models = await this.prismaService.schedule.findMany();

    return models.map(ScheduleModelMapper.toEntity);
  }

  async update(entity: ScheduleEntity): Promise<void> {
    await this._assureScheduleExists(entity.id);

    await this.prismaService.schedule.update({
      where: { id: entity.id },
      data: entity.toJSON(),
    });
  }

  async delete(id: string): Promise<void> {
    await this._assureScheduleExists(id);

    await this.prismaService.schedule.delete({
      where: { id },
    });
  }

  protected async _get(id: string): Promise<ScheduleEntity> {
    try {
      const schedule = await this.prismaService.schedule.findUnique({
        where: { id },
      });

      return ScheduleModelMapper.toEntity(schedule);
    } catch {
      throw new ScheduleWithIdNotFoundError(id);
    }
  }

  private async _assureScheduleExists(id: string) {
    if ((await this.prismaService.schedule.count({ where: { id } })) === 0) {
      throw new ScheduleWithIdNotFoundError(id);
    }
  }
}
