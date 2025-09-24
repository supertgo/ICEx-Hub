import { PrismaClient } from '@prisma/client';
import { BuildingPrismaRepository } from '@/building/infrastructure/database/prisma/repositories/building-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { BuildingDataBuilder } from '@/building/domain/testing/helper/building-data-builder';
import { BuildingEntity } from '@/building/domain/entities/building.entity';
import { ListBuildingsUsecase } from '@/building/application/usecases/list-building.usecase';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

describe('List buildings usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: BuildingPrismaRepository;
  let sut: ListBuildingsUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new BuildingPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new ListBuildingsUsecase.UseCase(repository);
    await prismaService.building.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });
});
