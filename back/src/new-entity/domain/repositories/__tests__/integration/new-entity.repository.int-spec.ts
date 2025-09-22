import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { NewEntityDataBuilder } from '@/new-entity/domain/testing/helper/new-entity-data-builder';
import { PrismaClient } from '@prisma/client';
import { NewEntityPrismaRepository } from '@/new-entity/infrastructure/database/prisma/repositories/new-entity-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { NewEntityEntity } from '@/new-entity/domain/entities/new-entity.entity';
import { faker } from '@faker-js/faker';
import { NewEntityRepository } from '@/new-entity/domain/repositories/new-entity.repository';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { NewEntityWithIdNotFoundError } from '@/new-entity/infrastructure/errors/new-entity-with-id-not-found-error';

describe('NewEntity prisma repository integration tests', () => {
  const prismaService = new PrismaClient();
  let sut: NewEntityPrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new NewEntityPrismaRepository(prismaService as any);
    await prismaService.new-entity.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when entity does not exist', () => {
    expect(() => sut.findById('1')).rejects.toThrow(
      new NewEntityWithIdNotFoundError('1'),
    );
  });

  it('should find new-entity by id', async () => {
    const entity = new NewEntityEntity(NewEntityDataBuilder({}));

    const createdNewEntity = await prismaService.new-entity.create({
      data: entity.toJSON(),
    });

    const new-entity = await sut.findById(createdNewEntity.id);

    expect(sut).not.toBeNull();
    expect(new-entity.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should insert a new new-entity', async () => {
    const entity = new NewEntityEntity(NewEntityDataBuilder({}));
    await sut.insert(entity);

  });

  it('should return one new-entity if theres only one with find all', async () => {
    const entity = new NewEntityEntity(NewEntityDataBuilder({}));
    await sut.insert(entity);

    const new-entitys = await sut.findAll();

    expect(new-entitys).toHaveLength(1);
    expect(new-entitys[0].toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should throw error when trying to update non-existent new-entity', async () => {
    const nonExistentId = faker.string.uuid();
    const entity = new NewEntityEntity(NewEntityDataBuilder({}), nonExistentId);

    await expect(sut.update(entity)).rejects.toThrow(
      new NewEntityWithIdNotFoundError(nonExistentId),
    );
  });

  it('should update a new-entity successfully', async () => { });

  it('should throw error when trying to delete non-existent new-entity', async () => {
    const nonExistentId = faker.string.uuid();

    await expect(sut.delete(nonExistentId)).rejects.toThrow(
      new NewEntityWithIdNotFoundError(nonExistentId),
    );
  });

  it('should delete a new-entity successfully', async () => {
    const entity = new NewEntityEntity(NewEntityDataBuilder({ name: 'John' }));
    await sut.insert(entity);

    await sut.delete(entity.id);

    const new-entityCount = await prismaService.new-entity.count({
      where: { id: entity.id },
    });

    expect(new-entityCount).toBe(0);
  });


  describe('search tests', () => {
    it.todo('should return with default values', async () => { });

    it.todo('should paginate new-entitys', async () => { });
  });
});
