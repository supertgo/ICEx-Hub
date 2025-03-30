import { Prisma } from '@prisma/client';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { ClassroomRepository } from '@/classroom/domain/repositories/classroom.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { ClassroomModelMapper } from '@/classroom/infrastructure/database/prisma/models/classroom-model.mapper';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ClassroomWithIdNotFoundError } from '@/classroom/infrastructure/errors/classroom-with-id-not-found';

export class ClassroomPrismaRepository
  implements ClassroomRepository.Repository
{
  constructor(private prismaService: PrismaService) {}

  sortableFields: string[] = ['name', 'createdAt'];

  async insert(entity: ClassroomEntity): Promise<ClassroomEntity> {
    const classroomFromPrisma = await this.prismaService.classroom.create({
      data: entity.toJSON(),
    });

    return ClassroomModelMapper.toEntity(classroomFromPrisma);
  }

  findById(id: string): Promise<ClassroomEntity> {
    return this._get(id);
  }

  async findAll(): Promise<ClassroomEntity[]> {
    const models = await this.prismaService.classroom.findMany();

    return models.map(ClassroomModelMapper.toEntity);
  }

  async update(entity: ClassroomEntity): Promise<void> {
    await this._assureClassroomExists(entity.id);

    await this.prismaService.classroom.update({
      where: { id: entity.id },
      data: entity.toJSON(),
    });
  }

  async delete(id: string): Promise<void> {
    await this._assureClassroomExists(id);

    await this.prismaService.classroom.delete({
      where: { id },
    });
  }

  protected async _get(id: string): Promise<ClassroomEntity> {
    try {
      const classroom = await this.prismaService.classroom.findUnique({
        where: { id },
      });

      return ClassroomModelMapper.toEntity(classroom);
    } catch {
      throw new ClassroomWithIdNotFoundError(id);
    }
  }

  async search(
    searchInput: ClassroomRepository.SearchParams,
  ): Promise<ClassroomRepository.SearchResult> {
    const sortable = this.sortableFields.includes(searchInput.sort) || false;
    const field = sortable ? searchInput.sort : 'createdAt';

    const orderBy = sortable ? searchInput.sortDir : SortOrderEnum.DESC;

    const hasFilter = searchInput.filter ? searchInput.filter : null;

    const filter = hasFilter
      ? {
          where: {
            name: {
              contains: searchInput.filter,
              mode: Prisma.QueryMode.insensitive,
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

    return new ClassroomRepository.SearchResult({
      items: models.map(ClassroomModelMapper.toEntity),
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
    searchInput: ClassroomRepository.SearchParams,
    field: string,
    orderBy: SortOrderEnum,
  ) {
    const [count, models] = await Promise.all([
      this.prismaService.classroom.count(filter),
      this.prismaService.classroom.findMany({
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

  private async _assureClassroomExists(id: string) {
    if ((await this.prismaService.classroom.count({ where: { id } })) === 0) {
      throw new ClassroomWithIdNotFoundError(id);
    }
  }
}
