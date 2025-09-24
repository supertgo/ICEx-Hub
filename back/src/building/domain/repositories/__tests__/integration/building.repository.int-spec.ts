import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { BuildingDataBuilder } from '@/building/domain/testing/helper/building-data-builder';
import { PrismaClient } from '@prisma/client';
import { BuildingPrismaRepository } from '@/building/infrastructure/database/prisma/repositories/building-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { BuildingEntity } from '@/building/domain/entities/building.entity';
import { faker } from '@faker-js/faker';
import { BuildingRepository } from '@/building/domain/repositories/building.repository';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { BuildingWithIdNotFoundError } from '@/building/infrastructure/errors/building-with-id-not-found-error';

describe('Building prisma repository integration tests', () => {
  const prismaService = new PrismaClient();
  let sut: BuildingPrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new BuildingPrismaRepository(prismaService as any);
    await prismaService.building.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when entity does not exist', () => {
    expect(() => sut.findById('1')).rejects.toThrow(
      new BuildingWithIdNotFoundError('1'),
    );
  });

  it('should find building by id', async () => {
    const entity = new BuildingEntity(BuildingDataBuilder({}));

    const createdBuilding = await prismaService.building.create({
      data: entity.toJSON(),
    });

    const building = await sut.findById(createdBuilding.id);

    expect(sut).not.toBeNull();
    expect(building.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should insert a new building', async () => {
    const entity = new BuildingEntity(BuildingDataBuilder({}));
    await sut.insert(entity);

  });

  it('should return one building if theres only one with find all', async () => {
    const entity = new BuildingEntity(BuildingDataBuilder({}));
    await sut.insert(entity);

    const buildings = await sut.findAll();

    expect(buildings).toHaveLength(1);
    expect(buildings[0].toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should throw error when trying to update non-existent building', async () => {
    const nonExistentId = faker.string.uuid();
    const entity = new BuildingEntity(BuildingDataBuilder({}), nonExistentId);

    await expect(sut.update(entity)).rejects.toThrow(
      new BuildingWithIdNotFoundError(nonExistentId),
    );
  });

  it('should update a building successfully', async () => { });

  it('should throw error when trying to delete non-existent building', async () => {
    const nonExistentId = faker.string.uuid();

    await expect(sut.delete(nonExistentId)).rejects.toThrow(
      new BuildingWithIdNotFoundError(nonExistentId),
    );
  });

  it('should delete a building successfully', async () => {
    const entity = new BuildingEntity(BuildingDataBuilder({ name: 'John' }));
    await sut.insert(entity);

    await sut.delete(entity.id);

    const buildingCount = await prismaService.building.count({
      where: { id: entity.id },
    });

    expect(buildingCount).toBe(0);
  });


  describe('search tests', () => {
    it.todo('should return with default values', async () => { });

    it.todo('should paginate buildings', async () => { });
  });
});
