import { PrismaClient } from '@prisma/client';
import { ClassroomPrismaRepository } from '@/classroom/infrastructure/database/prisma/repositories/classroom-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DeleteClassroomUsecase } from '@/classroom/application/usecases/delete-classroom.usecase';
import { faker } from '@faker-js/faker';
import { ClassroomWithIdNotFoundError } from '@/classroom/infrastructure/errors/classroom-with-id-not-found';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';

describe('Delete Classroom usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: ClassroomPrismaRepository;
  let sut: DeleteClassroomUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new ClassroomPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new DeleteClassroomUsecase.UseCase(repository);
    await prismaService.classroom.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when classroom not found', async () => {
    const id = faker.string.uuid();

    expect(() => sut.execute({ id })).rejects.toThrow(
      new ClassroomWithIdNotFoundError(id),
    );
  });

  it('should delete a classroom', async () => {
    const entity = ClassroomEntity.fake().aCADClassroom().build();

    const classroom = await prismaService.classroom.create({ data: entity });

    await sut.execute({ id: entity.id });

    const classroomCount = await prismaService.classroom.count({
      where: {
        id: classroom.id,
      },
    });

    expect(classroomCount).toBe(0);
  });
});
