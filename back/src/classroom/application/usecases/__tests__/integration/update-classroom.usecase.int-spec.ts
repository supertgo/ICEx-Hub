import { PrismaClient } from '@prisma/client';
import { ClassroomPrismaRepository } from '@/classroom/infrastructure/database/prisma/repositories/user-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { ClassroomDataBuilder } from '@/classroom/domain/testing/helper/user-data-builder';
import { ClassroomWithIdNotFoundError } from '@/classroom/infrastructure/errors/user-with-id-not-found-error';
import { UpdateClassroomUsecase } from '@/classroom/application/usecases/update-user.usecase';

describe('Update classroom usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: ClassroomPrismaRepository;
  let sut: UpdateClassroomUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new ClassroomPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new UpdateClassroomUsecase.UseCase(repository);
    await prismaService.classroom.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it.todo('should throw error when classroom not found', () => {});

  it.todo('should update a classroom', async () => { });
});
