import { PrismaClient } from '@prisma/client';
import { NewEntityPrismaRepository } from '@/new-entity/infrastructure/database/prisma/repositories/new-entity-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DeleteNewEntityUsecase } from '@/new-entity/application/usecases/delete-new-entity.usecase';

describe('Delete NewEntity usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: NewEntityPrismaRepository;
  let sut: DeleteNewEntityUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new NewEntityPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new DeleteNewEntityUsecase.UseCase(repository);
    await prismaService.new_entity.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when new-entity not found', () => { });

  it('should delete a new-entity', async () => {
  });
});
