import { PrismaClient } from '@prisma/client';
import { ClassroomPrismaRepository } from '@/classroom/infrastructure/database/prisma/repositories/classroom-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { ListClassroomsUsecase } from '@/classroom/application/usecases/list-classroom.usecase';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

describe('List classrooms usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: ClassroomPrismaRepository;
  let sut: ListClassroomsUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new ClassroomPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new ListClassroomsUsecase.UseCase(repository);
    await prismaService.classroom.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });
});
