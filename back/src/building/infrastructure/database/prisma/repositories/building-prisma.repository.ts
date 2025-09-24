import { Prisma } from '@prisma/client';
import { BuildingEntity } from '@/building/domain/entities/building.entity';
import { BuildingRepository } from '@/building/domain/repositories/building.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { BuildingWithIdNotFoundError } from '@/building/infrastructure/errors/building-with-id-not-found-error';
import { BuildingModelMapper } from '@/building/infrastructure/database/prisma/models/building-model.mapper';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

export class BuildingPrismaRepository implements BuildingRepository.Repository {
  constructor(private prismaService: PrismaService) {}

  async insert(entity: BuildingEntity): Promise<void> {
    const building = await this.prismaService.building.create({
      data: entity.toJSON(),
    });

    return BuildingModelMapper.toEntity(building);
  }

  findById(id: string): Promise<BuildingEntity> {
    return this._get(id);
  }

  async findAll(): Promise<BuildingEntity[]> {
    const models = await this.prismaService.building.findMany();

    return models.map(BuildingModelMapper.toEntity);
  }

  async update(entity: BuildingEntity): Promise<void> {
    await this._assureBuildingExists(entity.id);

    await this.prismaService.building.update({
      where: { id: entity.id },
      data: entity.toJSON(),
    });
  }

  async delete(id: string): Promise<void> {
    await this._assureBuildingExists(id);

    await this.prismaService.building.delete({
      where: { id },
    });
  }

  protected async _get(id: string): Promise<BuildingEntity> {
    try {
      const building = await this.prismaService.building.findUnique({
        where: { id },
      });

      return BuildingModelMapper.toEntity(building);
    } catch {
      throw new BuildingWithIdNotFoundError(id);
    }
  }

  private async _assureBuildingExists(id: string) {
    if ((await this.prismaService.building.count({ where: { id } })) === 0) {
      throw new BuildingWithIdNotFoundError(id);
    }
  }
}
