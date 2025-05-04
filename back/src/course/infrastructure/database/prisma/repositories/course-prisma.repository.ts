import { CourseEntity } from '@/course/domain/entities/course.entity';
import { CourseRepository } from '@/course/domain/repositories/course.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { CourseModelMapper } from '@/course/infrastructure/database/prisma/models/course-model.mapper';
import { CourseWithIdNotFoundError } from '@/course/infrastructure/errors/course-with-id-not-found-error';
import { Course } from '@prisma/client';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { sanitizeString } from '@/shared/domain/helper/sanitize-string.helper';

export class CoursePrismaRepository implements CourseRepository.Repository {
  constructor(private prismaService: PrismaService) {}

  async insert(entity: CourseEntity): Promise<CourseEntity> {
    const created = await this.prismaService.course.create({
      data: {
        ...entity.toJSON(),
        sanitized_name: sanitizeString(entity.name),
      },
    });

    return CourseModelMapper.toEntity(created as Course);
  }

  findById(id: string): Promise<CourseEntity> {
    return this._get(id);
  }

  async findAll(): Promise<CourseEntity[]> {
    const models = await this.prismaService.course.findMany();

    return models.map(CourseModelMapper.toEntity);
  }

  async update(entity: CourseEntity): Promise<void> {
    await this.assureCourseExists(entity.id);

    await this.prismaService.course.update({
      where: { id: entity.id },
      data: entity.toJSON(),
    });
  }

  async delete(id: string): Promise<void> {
    await this.assureCourseExists(id);

    await this.prismaService.course.delete({
      where: { id },
    });
  }

  protected async _get(id: string): Promise<CourseEntity> {
    try {
      const course = await this.prismaService.course.findUnique({
        where: { id },
      });

      return CourseModelMapper.toEntity(course as Course);
    } catch {
      throw new CourseWithIdNotFoundError(id);
    }
  }

  public async assureCourseExists(id: string): Promise<void> {
    if ((await this.prismaService.course.count({ where: { id } })) === 0) {
      throw new CourseWithIdNotFoundError(id);
    }
  }

  sortableFields: string[] = ['name', 'code', 'createdAt'];

  async search(
    searchInput: CourseRepository.SearchParams,
  ): Promise<CourseRepository.SearchResult> {
    const sortable = this.sortableFields.includes(searchInput.sort) || false;
    const field = sortable ? searchInput.sort : 'createdAt';

    const orderBy = sortable ? searchInput.sortDir : SortOrderEnum.DESC;

    const hasFilter = searchInput.filter ? searchInput.filter : null;

    const filter = hasFilter
      ? {
          where: {
            OR: [
              {
                sanitized_name: {
                  contains: sanitizeString(searchInput.filter),
                  mode: 'insensitive',
                },
              },
              {
                code: {
                  contains: searchInput.filter,
                  mode: 'insensitive',
                },
              },
            ],
          },
        }
      : undefined;

    const { count, models } = await this.executeQueries(
      filter,
      searchInput,
      field,
      orderBy,
    );

    return new CourseRepository.SearchResult({
      items: models.map(CourseModelMapper.toEntity),
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
    searchInput: CourseRepository.SearchParams,
    field: string,
    orderBy: SortOrderEnum,
  ) {
    const [count, models] = await Promise.all([
      this.prismaService.course.count(filter),
      this.prismaService.course.findMany({
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
