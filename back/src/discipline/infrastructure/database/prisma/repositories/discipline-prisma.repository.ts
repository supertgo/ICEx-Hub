import { Prisma } from '@prisma/client';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { DisciplineRepository } from '@/discipline/domain/repositories/discipline.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';
import { DisciplineModelMapper } from '@/discipline/infrastructure/database/prisma/models/discipline-model.mapper';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { sanitizeString } from '@/shared/domain/helper/sanitize-string.helper';

export class DisciplinePrismaRepository
  implements DisciplineRepository.Repository
{
  constructor(private prismaService: PrismaService) {}
  async assureDisciplineExists(_disciplineId: string): Promise<void> {
    await this._assureDisciplineExists(_disciplineId);
  }

  sortableFields: string[] = ['name', 'code', 'createdAt'];

  async search(
    searchInput: DisciplineRepository.SearchParams,
  ): Promise<DisciplineRepository.SearchResult> {
    const sortable = this.sortableFields.includes(searchInput.sort) || false;
    const field = sortable ? searchInput.sort : 'createdAt';
    const orderBy = sortable ? searchInput.sortDir : SortOrderEnum.DESC;

    const whereFilter: Prisma.DisciplineWhereInput = this.buildWhereFilter(
      searchInput.filter,
    );

    const { count, models } = await this.executeQueries(
      whereFilter,
      searchInput,
      field,
      orderBy,
    );

    return new DisciplineRepository.SearchResult({
      items: models.map(DisciplineModelMapper.toEntity),
      total: count,
      currentPage: searchInput.page > 0 ? searchInput.page : 1,
      perPage: searchInput.perPage > 0 ? searchInput.perPage : 10,
      sort: searchInput.sort,
      sortDir: searchInput.sortDir,
      filter: searchInput.filter,
    });
  }

  private buildWhereFilter(
    filter: DisciplineRepository.Filter | null,
  ): Prisma.DisciplineWhereInput {
    if (!filter) return {};

    const andConditions: Prisma.DisciplineWhereInput[] = [];

    if (filter.name) {
      andConditions.push({
        sanitized_name: {
          contains: sanitizeString(filter.name),
          mode: 'insensitive',
        },
      });
    }

    if (filter.code) {
      andConditions.push({
        code: {
          contains: filter.code,
          mode: 'insensitive',
        },
      });
    }

    if (filter.courseId) {
      andConditions.push({
        courseId: filter.courseId,
      });
    }

    if (filter.coursePeriodId) {
      andConditions.push({
        coursePeriodId: filter.coursePeriodId,
      });
    }

    return andConditions.length > 0 ? { AND: andConditions } : {};
  }

  private async executeQueries(
    whereFilter: Prisma.DisciplineWhereInput,
    searchInput: DisciplineRepository.SearchParams,
    field: string,
    orderBy: SortOrderEnum,
  ) {
    const [count, models] = await Promise.all([
      this.prismaService.discipline.count({
        where: whereFilter,
      }),
      this.prismaService.discipline.findMany({
        where: whereFilter,
        skip:
          (searchInput.page > 0 ? searchInput.page - 1 : 0) *
          (searchInput.perPage > 0 ? searchInput.perPage : 10),
        take: searchInput.perPage > 0 ? searchInput.perPage : 10,
        orderBy: {
          [field]: orderBy,
        },
      }),
    ]);

    return { count, models };
  }

  async insert(entity: DisciplineEntity): Promise<DisciplineEntity> {
    const data = {
      id: entity.id,
      name: entity.name,
      sanitized_name: sanitizeString(entity.name),
      code: entity.code,
      courseId: entity.courseId,
      coursePeriodId: entity.coursePeriodId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };

    const createdDiscipline = await this.prismaService.discipline.create({
      data,
    });

    return DisciplineModelMapper.toEntity(createdDiscipline);
  }

  async findById(id: string): Promise<DisciplineEntity> {
    return this._get(id);
  }

  async findAll(): Promise<DisciplineEntity[]> {
    const models = await this.prismaService.discipline.findMany();
    return models.map(DisciplineModelMapper.toEntity);
  }

  async update(entity: DisciplineEntity): Promise<void> {
    await this._assureDisciplineExists(entity.id);
    const data = {
      id: entity.id,
      name: entity.name,
      sanitizeString: sanitizeString(entity.name),
      code: entity.code,
      courseId: entity.courseId,
      coursePeriodId: entity.coursePeriodId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };

    await this.prismaService.discipline.update({
      where: { id: entity.id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this._assureDisciplineExists(id);

    await this.prismaService.discipline.delete({
      where: { id },
    });
  }

  private async _get(id: string): Promise<DisciplineEntity> {
    const discipline = await this.prismaService.discipline.findUnique({
      where: { id },
    });

    if (!discipline) {
      throw new DisciplineWithIdNotFoundError(id);
    }

    return DisciplineModelMapper.toEntity(discipline);
  }

  private async _assureDisciplineExists(id: string) {
    const exists = await this.prismaService.discipline.count({ where: { id } });
    if (exists === 0) {
      throw new DisciplineWithIdNotFoundError(id);
    }
  }
}
