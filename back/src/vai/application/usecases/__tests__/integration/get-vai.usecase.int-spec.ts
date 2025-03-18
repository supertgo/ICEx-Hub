import { PrismaClient } from '@prisma/client';
import { VaiPrismaRepository } from '@/vai/infrastructure/database/prisma/repositories/user-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { GetVaiUsecase } from '@/vai/application/usecases/get-user.usecase';

describe('Get vai usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: VaiPrismaRepository;
  let sut: GetVaiUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new VaiPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new GetVaiUsecase.UseCase(repository);
    await prismaService.vai.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when vai not found', () => {
    const id = faker.string.uuid();
    expect(() => sut.execute({ id })).rejects.toThrowError(
      new VaiWithIdNotFoundError(id),
    );
  });

  it('should retrieve a vai', async () => {
    const vai = await prismaService.user.create({ data: VaiDataBuilder({}) });

    const output = await sut.execute({ id: vai.id });

    expect(output).toBeDefined();
    expect(output).toMatchObject(vai);
  });
});
