import { PrismaClient } from '@prisma/client';
import { VaiPrismaRepository } from '@/vai/infrastructure/database/prisma/repositories/{dashCase name}}-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DeleteVaiUsecase } from '@/vai/application/usecases/delete-vai.usecase';

describe('Delete Vai usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: VaiPrismaRepository;
  let sut: DeleteVaiUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new VaiPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new DeleteVaiUsecase.UseCase(repository);
    await prismaService.vai.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when vai not found', () => { });

  it('should delete a vai', async () => {
  });
});
