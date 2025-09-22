import { PrismaClient } from '@prisma/client';
import { NewEntityPrismaRepository } from '@/new-entity/infrastructure/database/prisma/repositories/new-entity-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { NewEntityDataBuilder } from '@/new-entity/domain/testing/helper/new-entity-data-builder';
import { NewEntityEntity } from '@/new-entity/domain/entities/new-entity.entity';
import { ListNewEntitysUsecase } from '@/new-entity/application/usecases/list-new-entity.usecase';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

describe('List new-entitys usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: NewEntityPrismaRepository;
  let sut: ListNewEntitysUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new NewEntityPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new ListNewEntitysUsecase.UseCase(repository);
    await prismaService.new-entity.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });
});
