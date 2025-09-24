import { PrismaClient } from '@prisma/client';
import { BuildingPrismaRepository } from '@/building/infrastructure/database/prisma/repositories/building-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DeleteBuildingUsecase } from '@/building/application/usecases/delete-building.usecase';

describe('Delete Building usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: BuildingPrismaRepository;
  let sut: DeleteBuildingUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new BuildingPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new DeleteBuildingUsecase.UseCase(repository);
    await prismaService.building.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when building not found', () => { });

  it('should delete a building', async () => {
  });
});
