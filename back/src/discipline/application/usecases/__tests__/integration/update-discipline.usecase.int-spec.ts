import { PrismaClient } from '@prisma/client';
import { DisciplinePrismaRepository } from '@/discipline/infrastructure/database/prisma/repositories/discipline-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';
import { UpdateDisciplineUsecase } from '@/discipline/application/usecases/update-discipline.usecase';

describe('Update discipline usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: DisciplinePrismaRepository;
  let sut: UpdateDisciplineUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new DisciplinePrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new UpdateDisciplineUsecase.UseCase(repository);
    await prismaService.discipline.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it.todo('should throw error when discipline not found');

  it.todo('should update a discipline');
});
