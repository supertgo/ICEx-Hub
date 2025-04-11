import { ClassroomBulding, DayPattern, Prisma, TimeSlot } from '@prisma/client';
import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ScheduleRepository } from '@/schedule/domain/repositories/schedule.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { ScheduleWithIdNotFoundError } from '@/schedule/infrastructure/errors/schedule-with-id-not-found-error';
import { ScheduleModelMapper } from '@/schedule/infrastructure/database/prisma/models/schedule-model.mapper';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

export class SchedulePrismaRepository implements ScheduleRepository.Repository {
  constructor(private prismaService: PrismaService) {}

  sortableFields: string[] = ['createdAt'];

  async search(
    searchInput: ScheduleRepository.SearchParams,
  ): Promise<ScheduleRepository.SearchResult> {
    const sortable = this.sortableFields.includes(searchInput.sort) || false;
    const field = sortable ? searchInput.sort : 'createdAt';
    const orderBy = sortable ? searchInput.sortDir : SortOrderEnum.DESC;

    const hasFilter = searchInput.filter ? searchInput.filter : false;

    const buildingEnumValues = Object.values(ClassroomBulding) as string[];

    const buildingMatch =
      searchInput.filter?.name &&
      buildingEnumValues.find(
        (value) =>
          value.toLowerCase() === searchInput.filter.name.toLowerCase(),
      );

    const whereFilter: Prisma.ScheduleWhereInput = {};

    if (hasFilter) {
      const andConditions: Prisma.ScheduleWhereInput[] = [];

      if (searchInput.filter.name) {
        const nameOrConditions: Prisma.ScheduleWhereInput[] = [
          {
            classroom: {
              name: {
                contains: searchInput.filter.name,
                mode: 'insensitive',
              },
            },
          },
          {
            discipline: {
              name: {
                contains: searchInput.filter.name,
                mode: 'insensitive',
              },
            },
          },
          {
            discipline: {
              code: {
                contains: searchInput.filter.name,
                mode: 'insensitive',
              },
            },
          },
        ];

        if (buildingMatch) {
          nameOrConditions.push({
            classroom: {
              building:
                searchInput.filter.name.toUpperCase() as ClassroomBulding,
            },
          });
        }

        andConditions.push({ OR: nameOrConditions });
      }

      if (searchInput.filter.timeSlots?.length) {
        andConditions.push({
          timeSlot: {
            in: searchInput.filter.timeSlots as TimeSlot[],
          },
        });
      }

      if (searchInput.filter.dayPatterns?.length) {
        andConditions.push({
          dayPattern: {
            in: searchInput.filter.dayPatterns as DayPattern[],
          },
        });
      }

      if (searchInput.filter.courseId) {
        andConditions.push({
          discipline: {
            courseId: searchInput.filter.courseId,
          },
        });
      }

      if (searchInput.filter.coursePeriodId) {
        andConditions.push({
          discipline: {
            coursePeriodId: searchInput.filter.coursePeriodId,
          },
        });
      }

      if (andConditions.length > 0) {
        whereFilter.AND = andConditions;
      }
    }

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
    searchInput: ScheduleRepository.SearchParams,
    field: string,
    orderBy: SortOrderEnum,
  ) {
    const [count, models] = await Promise.all([
      this.prismaService.schedule.count({
        where: whereFilter,
      }),
      this.prismaService.schedule.findMany({
        select: {
          id: true,
          classroomId: true,
          classroom: true,
          disciplineId: true,
          discipline: true,
          createdAt: true,
          dayPattern: true,
          timeSlot: true,
          updatedAt: true,
        },
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
        where: whereFilter,
      }),
    ]);

    return { count, models };
  }
  async insert(entity: ScheduleEntity): Promise<ScheduleEntity> {
    const result = entity.toJSON();
    const schedule = await this.prismaService.schedule.create({
      data: {
        timeSlot: result.timeSlot,
        disciplineId: entity.disciplineId,
        classroomId: entity.classroomId,
        dayPattern: entity.dayPattern,
      },
      include: {
        classroom: true,
        discipline: true,
      },
    });

    return ScheduleModelMapper.toEntity(schedule);
  }

  findById(id: string): Promise<ScheduleEntity> {
    return this._get(id);
  }

  async findAll(): Promise<ScheduleEntity[]> {
    const models = await this.prismaService.schedule.findMany({
      include: {
        classroom: true,
        discipline: true,
      },
    });

    return models.map(ScheduleModelMapper.toEntity);
  }

  async update(entity: ScheduleEntity): Promise<void> {
    await this._assureScheduleExists(entity.id);

    await this.prismaService.schedule.update({
      where: { id: entity.id },
      data: {
        timeSlot: entity.timeSlot,
        disciplineId: entity.disciplineId,
        classroomId: entity.classroomId,
        dayPattern: entity.dayPattern,
      },
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
        select: {
          id: true,
          classroomId: true,
          classroom: true,
          disciplineId: true,
          discipline: true,
          createdAt: true,
          dayPattern: true,
          timeSlot: true,
          updatedAt: true,
        },
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
