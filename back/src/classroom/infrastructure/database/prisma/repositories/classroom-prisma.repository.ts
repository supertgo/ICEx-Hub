import { Prisma } from '@prisma/client';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { ClassroomRepository } from '@/classroom/domain/repositories/classroom.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { ClassroomWithIdNotFoundError } from '@/classroom/infrastructure/errors/classroom-with-id-not-found-error';
import { ClassroomModelMapper } from '@/classroom/infrastructure/database/prisma/models/classroom-model.mapper';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

export class ClassroomPrismaRepository implements ClassroomRepository.Repository {
  constructor(private prismaService: PrismaService) {}

  async insert(entity: ClassroomEntity): Promise<void> {
    await this.prismaService.classroom.create({
      data: entity.toJSON(),
    });
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

  private async _assureClassroomExists(id: string) {
    if ((await this.prismaService.classroom.count({ where: { id } })) === 0) {
      throw new ClassroomWithIdNotFoundError(id);
    }
  }
}
