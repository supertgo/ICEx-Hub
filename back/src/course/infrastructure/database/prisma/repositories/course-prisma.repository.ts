import { CourseEntity } from '@/course/domain/entities/course.entity';
import { CourseRepository } from '@/course/domain/repositories/course.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { CourseModelMapper } from '@/course/infrastructure/database/prisma/models/course-model.mapper';
import { CourseWithIdNotFoundError } from '@/course/infrastructure/Errors/course-with-id-not-found-error';
import { Course } from '@prisma/client';

export class CoursePrismaRepository implements CourseRepository.Repository {
  constructor(private prismaService: PrismaService) {}

  async insert(entity: CourseEntity): Promise<void> {
    await this.prismaService.course.create({
      data: entity.toJSON(),
    });
  }

  findById(id: string): Promise<CourseEntity> {
    return this._get(id);
  }

  async findAll(): Promise<CourseEntity[]> {
    const models = await this.prismaService.course.findMany();

    return models.map(CourseModelMapper.toEntity);
  }

  async update(entity: CourseEntity): Promise<void> {
    await this._assureCourseExists(entity.id);

    await this.prismaService.course.update({
      where: { id: entity.id },
      data: entity.toJSON(),
    });
  }

  async delete(id: string): Promise<void> {
    await this._assureCourseExists(id);

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

  private async _assureCourseExists(id: string) {
    if ((await this.prismaService.course.count({ where: { id } })) === 0) {
      throw new CourseWithIdNotFoundError(id);
    }
  }
}
