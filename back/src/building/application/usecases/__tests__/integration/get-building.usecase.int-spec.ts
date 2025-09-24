import { PrismaClient } from '@prisma/client';
import { BuildingPrismaRepository } from '@/building/infrastructure/database/prisma/repositories/building-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { GetBuildingUsecase } from '@/building/application/usecases/get-building.usecase';
import { faker } from '@faker-js/faker';

describe('Get building usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: BuildingPrismaRepository;
  let sut: GetBuildingUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new BuildingPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new GetBuildingUsecase.UseCase(repository);
    await prismaService.building.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when building not found', () => {
    const id = faker.string.uuid();
    expect(() => sut.execute({ id })).rejects.toThrow(
      new BuildingWithIdNotFoundError(id),
    );
  });

  it('should retrieve a building', async () => {
    const building = await prismaService.building.create({ data: BuildingDataBuilder({}) });

    const output = await sut.execute({ id: building.id });

    expect(output).toBeDefined();
    expect(output).toMatchObject(building);
  });
});
