import { PrismaClient } from '@prisma/client';
import { BuildingPrismaRepository } from '@/building/infrastructure/database/prisma/repositories/building-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { BuildingDataBuilder } from '@/building/domain/testing/helper/building-data-builder';
import { BuildingWithIdNotFoundError } from '@/building/infrastructure/errors/building-with-id-not-found-error';
import { UpdateBuildingUsecase } from '@/building/application/usecases/update-building.usecase';

describe('Update building usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: BuildingPrismaRepository;
  let sut: UpdateBuildingUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new BuildingPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new UpdateBuildingUsecase.UseCase(repository);
    await prismaService.building.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it.todo('should throw error when building not found');

  it.todo('should update a building');
});
