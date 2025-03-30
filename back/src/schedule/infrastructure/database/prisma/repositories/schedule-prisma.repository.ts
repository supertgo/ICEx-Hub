import { Prisma } from '@prisma/client';
import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ScheduleRepository } from '@/schedule/domain/repositories/schedule.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { ScheduleWithIdNotFoundError } from '@/schedule/infrastructure/errors/schedule-with-id-not-found-error';
import { ScheduleModelMapper } from '@/schedule/infrastructure/database/prisma/models/schedule-model.mapper';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

export class SchedulePrismaRepository implements ScheduleRepository.Repository {
  constructor(private prismaService: PrismaService) {}

  async insert(entity: ScheduleEntity): Promise<void> {
    const schedule = await this.prismaService.schedule.create({
      data: entity.toJSON(),
    });

    return ScheduleMapper.toEntity(schedule);
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
