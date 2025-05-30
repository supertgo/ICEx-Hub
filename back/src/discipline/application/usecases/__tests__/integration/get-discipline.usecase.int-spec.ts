import { PrismaClient } from '@prisma/client';
import { DisciplinePrismaRepository } from '@/discipline/infrastructure/database/prisma/repositories/discipline-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { GetDisciplineUsecase } from '@/discipline/application/usecases/get-discipline.usecase';
import { faker } from '@faker-js/faker';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';
import { DisciplinePrismaTestingHelper } from '@/discipline/infrastructure/database/prisma/testing/discipline-prisma.testing-helper';

describe('Get discipline usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: DisciplinePrismaRepository;
  let sut: GetDisciplineUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new DisciplinePrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new GetDisciplineUsecase.UseCase(repository);
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when discipline not found', () => {
    const id = faker.string.uuid();
    expect(() => sut.execute({ id })).rejects.toThrow(
      new DisciplineWithIdNotFoundError(id),
    );
  });

  it('should retrieve a discipline', async () => {
    const discipline =
      await DisciplinePrismaTestingHelper.createDiscipline(prismaService);

    const output = await sut.execute({ id: discipline.id });

    expect(output).toBeDefined();
    expect(output).toMatchObject(discipline);
  });
});
