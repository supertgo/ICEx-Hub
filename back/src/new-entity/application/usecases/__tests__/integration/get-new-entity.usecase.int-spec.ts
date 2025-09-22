import { PrismaClient } from '@prisma/client';
import { NewEntityPrismaRepository } from '@/new-entity/infrastructure/database/prisma/repositories/new-entity-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { GetNewEntityUsecase } from '@/new-entity/application/usecases/get-new-entity.usecase';
import { faker } from '@faker-js/faker';

describe('Get new-entity usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: NewEntityPrismaRepository;
  let sut: GetNewEntityUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new NewEntityPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new GetNewEntityUsecase.UseCase(repository);
    await prismaService.new-entity.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when new-entity not found', () => {
    const id = faker.string.uuid();
    expect(() => sut.execute({ id })).rejects.toThrow(
      new NewEntityWithIdNotFoundError(id),
    );
  });

  it('should retrieve a new-entity', async () => {
    const new_entity = await prismaService.new-entity.create({ data: NewEntityDataBuilder({}) });

    const output = await sut.execute({ id: new_entity.id });

    expect(output).toBeDefined();
    expect(output).toMatchObject(new_entity);
  });
});
