import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { Classroom } from '@prisma/client';
import { ClassroomModelMapper } from '@/classroom/infrastructure/database/prisma/models/classroom-model.mapper';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';

describe('Classroom model mapper integration tests', () => {
  let prismaService: PrismaService;
  const entity = ClassroomEntity.fake()
    .aCADClassroom()
    .withName(new Date().toISOString())
    .build();
  const props = {
    id: entity.id,
    name: entity.name,
    building: entity.building,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };

  beforeAll(async () => {
    setUpPrismaTest();

    prismaService = new PrismaService();
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throw error when classroom model is invalid', () => {
    const model: Classroom = Object.assign({}, props, { name: null });

    expect(() => ClassroomModelMapper.toEntity(model)).toThrow(
      new ValidationErrors(`Could not load classroom having id ${props.id}`),
    );
  });

  it('should map classroom model to entity', async () => {
    const model: Classroom = await prismaService.classroom.create({
      data: props,
    });

    const sut = ClassroomModelMapper.toEntity(model);

    expect(sut).toBeInstanceOf(ClassroomEntity);
  });
});
