import { PrismaClient } from '@prisma/client';
import { DisciplinePrismaRepository } from '@/discipline/infrastructure/database/prisma/repositories/discipline-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DeleteDisciplineUsecase } from '@/discipline/application/usecases/delete-discipline.usecase';

describe('Delete Discipline usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: DisciplinePrismaRepository;
  let sut: DeleteDisciplineUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new DisciplinePrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new DeleteDisciplineUsecase.UseCase(repository);
    await prismaService.discipline.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when discipline not found', () => { });

  it('should delete a discipline', async () => {
  });
});
