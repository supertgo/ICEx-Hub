import { PrismaClient } from '@prisma/client';
import { VaiPrismaRepository } from '@/vai/infrastructure/database/prisma/repositories/vai-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { VaiDataBuilder } from '@/vai/domain/testing/helper/vai-data-builder';
import { VaiEntity } from '@/vai/domain/entities/vai.entity';
import { ListVaisUsecase } from '@/vai/application/usecases/list-vais.usecase';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

describe('List vais usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: VaiPrismaRepository;
  let sut: ListVaisUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new VaiPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new ListVaisUsecase.UseCase(repository);
    await prismaService.vai.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });
});
