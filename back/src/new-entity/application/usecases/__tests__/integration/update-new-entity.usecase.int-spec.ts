import { PrismaClient } from '@prisma/client';
import { NewEntityPrismaRepository } from '@/new-entity/infrastructure/database/prisma/repositories/new-entity-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { NewEntityDataBuilder } from '@/new-entity/domain/testing/helper/new-entity-data-builder';
import { NewEntityWithIdNotFoundError } from '@/new-entity/infrastructure/errors/new-entity-with-id-not-found-error';
import { UpdateNewEntityUsecase } from '@/new-entity/application/usecases/update-new-entity.usecase';

describe('Update new-entity usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: NewEntityPrismaRepository;
  let sut: UpdateNewEntityUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new NewEntityPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new UpdateNewEntityUsecase.UseCase(repository);
    await prismaService.new-entity.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it.todo('should throw error when new-entity not found');

  it.todo('should update a new-entity');
});
