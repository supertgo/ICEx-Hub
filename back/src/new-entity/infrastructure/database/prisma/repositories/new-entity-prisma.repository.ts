import { Prisma } from '@prisma/client';
import { NewEntityEntity } from '@/new-entity/domain/entities/new-entity.entity';
import { NewEntityRepository } from '@/new-entity/domain/repositories/new-entity.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { NewEntityWithIdNotFoundError } from '@/new-entity/infrastructure/errors/new-entity-with-id-not-found-error';
import { NewEntityModelMapper } from '@/new-entity/infrastructure/database/prisma/models/new-entity-model.mapper';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

export class NewEntityPrismaRepository implements NewEntityRepository.Repository {
  constructor(private prismaService: PrismaService) {}

  async insert(entity: NewEntityEntity): Promise<void> {
    const new-entity = await this.prismaService.new-entity.create({
      data: entity.toJSON(),
    });

    return NewEntityModelMapper.toEntity(new-entity);
  }

  findById(id: string): Promise<NewEntityEntity> {
    return this._get(id);
  }

  async findAll(): Promise<NewEntityEntity[]> {
    const models = await this.prismaService.new-entity.findMany();

    return models.map(NewEntityModelMapper.toEntity);
  }

  async update(entity: NewEntityEntity): Promise<void> {
    await this._assureNewEntityExists(entity.id);

    await this.prismaService.new-entity.update({
      where: { id: entity.id },
      data: entity.toJSON(),
    });
  }

  async delete(id: string): Promise<void> {
    await this._assureNewEntityExists(id);

    await this.prismaService.new-entity.delete({
      where: { id },
    });
  }

  protected async _get(id: string): Promise<NewEntityEntity> {
    try {
      const new-entity = await this.prismaService.new-entity.findUnique({
        where: { id },
      });

      return NewEntityModelMapper.toEntity(new-entity);
    } catch {
      throw new NewEntityWithIdNotFoundError(id);
    }
  }

  private async _assureNewEntityExists(id: string) {
    if ((await this.prismaService.new-entity.count({ where: { id } })) === 0) {
      throw new NewEntityWithIdNotFoundError(id);
    }
  }
}
