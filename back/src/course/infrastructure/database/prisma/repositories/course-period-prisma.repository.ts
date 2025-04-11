import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { CoursePeriod } from '@prisma/client';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { CoursePeriodRepository } from '@/course/domain/repositories/course-period.repository';
import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';
import { CoursePeriodModelMapper } from '@/course/infrastructure/database/prisma/models/course-period-model.mapper';
import { CoursePeriodWithIdNotFoundError } from '@/course/infrastructure/errors/course-period-with-id-not-found-error';

export class CoursePeriodPrismaRepository
  implements CoursePeriodRepository.Repository
{
  constructor(private prismaService: PrismaService) {}

  async insert(entity: CoursePeriodEntity): Promise<CoursePeriodEntity> {
    const created = await this.prismaService.coursePeriod.create({
      data: entity.toJSON(),
    });

    return CoursePeriodModelMapper.toEntity(created as CoursePeriod);
  }

  findById(id: string): Promise<CoursePeriodEntity> {
    return this._get(id);
  }

  async findAll(): Promise<CoursePeriodEntity[]> {
    const models = await this.prismaService.coursePeriod.findMany();

    return models.map(CoursePeriodModelMapper.toEntity);
  }

  async update(entity: CoursePeriodEntity): Promise<void> {
    await this.assureCoursePeriodExists(entity.id);

    await this.prismaService.coursePeriod.update({
      where: { id: entity.id },
      data: entity.toJSON(),
    });
  }

  async delete(id: string): Promise<void> {
    await this.assureCoursePeriodExists(id);

    await this.prismaService.course.delete({
      where: { id },
    });
  }

  protected async _get(id: string): Promise<CoursePeriodEntity> {
    try {
      const coursePeriod = await this.prismaService.coursePeriod.findUnique({
        where: { id },
      });

      return CoursePeriodModelMapper.toEntity(coursePeriod as CoursePeriod);
    } catch {
      throw new CoursePeriodWithIdNotFoundError(id);
    }
  }

  public async assureCoursePeriodExists(id: string): Promise<void> {
    if (
      (await this.prismaService.coursePeriod.count({ where: { id } })) === 0
    ) {
      throw new CoursePeriodWithIdNotFoundError(id);
    }
  }

  sortableFields: string[] = ['name', 'code', 'createdAt'];

  async search(
    searchInput: CoursePeriodRepository.SearchParams,
  ): Promise<CoursePeriodRepository.SearchResult> {
    const sortable = this.sortableFields.includes(searchInput.sort) || false;
    const field = sortable ? searchInput.sort : 'name';

    const orderBy = sortable ? searchInput.sortDir : SortOrderEnum.DESC;

    const hasFilter = searchInput.filter ? searchInput.filter : null;

    const filter = hasFilter
      ? {
          where: {
            name: {
              contains: searchInput.filter,
              mode: 'insensitive',
            },
          },
        }
      : undefined;

    const { count, models } = await this.executeQueries(
      filter,
      searchInput,
      field,
      orderBy,
    );

    return new CoursePeriodRepository.SearchResult({
      items: models.map(CoursePeriodModelMapper.toEntity),
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
    filter: any,
    searchInput: CoursePeriodRepository.SearchParams,
    field: string,
    orderBy: SortOrderEnum,
  ) {
    const [count, models] = await Promise.all([
      this.prismaService.coursePeriod.count(filter),
      this.prismaService.coursePeriod.findMany({
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
        ...(filter ? filter : {}),
      }),
    ]);

    return { count, models };
  }
}
