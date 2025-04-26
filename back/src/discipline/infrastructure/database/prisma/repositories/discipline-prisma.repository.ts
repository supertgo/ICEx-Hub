import { Prisma } from '@prisma/client';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { DisciplineRepository } from '@/discipline/domain/repositories/discipline.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';
import { DisciplineModelMapper } from '@/discipline/infrastructure/database/prisma/models/discipline-model.mapper';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

export class DisciplinePrismaRepository implements DisciplineRepository.Repository {
  constructor(private prismaService: PrismaService) {}

  async insert(entity: DisciplineEntity): Promise<void> {
    const discipline = await this.prismaService.discipline.create({
      data: entity.toJSON(),
    });

    return DisciplineModelMapper.toEntity(discipline);
  }

  findById(id: string): Promise<DisciplineEntity> {
    return this._get(id);
  }

  async findAll(): Promise<DisciplineEntity[]> {
    const models = await this.prismaService.discipline.findMany();

    return models.map(DisciplineModelMapper.toEntity);
  }

  async update(entity: DisciplineEntity): Promise<void> {
    await this._assureDisciplineExists(entity.id);

    await this.prismaService.discipline.update({
      where: { id: entity.id },
      data: entity.toJSON(),
    });
  }

  async delete(id: string): Promise<void> {
    await this._assureDisciplineExists(id);

    await this.prismaService.discipline.delete({
      where: { id },
    });
  }

  protected async _get(id: string): Promise<DisciplineEntity> {
    try {
      const discipline = await this.prismaService.discipline.findUnique({
        where: { id },
      });

      return DisciplineModelMapper.toEntity(discipline);
    } catch {
      throw new DisciplineWithIdNotFoundError(id);
    }
  }

  private async _assureDisciplineExists(id: string) {
    if ((await this.prismaService.discipline.count({ where: { id } })) === 0) {
      throw new DisciplineWithIdNotFoundError(id);
    }
  }
}
