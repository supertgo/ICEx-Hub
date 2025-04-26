import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { PrismaClient } from '@prisma/client';
import { DisciplinePrismaRepository } from '@/discipline/infrastructure/database/prisma/repositories/discipline-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { faker } from '@faker-js/faker';
import { DisciplineRepository } from '@/discipline/domain/repositories/discipline.repository';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';

describe('Discipline prisma repository integration tests', () => {
  const prismaService = new PrismaClient();
  let sut: DisciplinePrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new DisciplinePrismaRepository(prismaService as any);
    await prismaService.discipline.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when entity does not exist', () => {
    expect(() => sut.findById('1')).rejects.toThrow(
      new DisciplineWithIdNotFoundError('1'),
    );
  });

  it('should find discipline by id', async () => {
    const entity = new DisciplineEntity(DisciplineDataBuilder({}));

    const createdDiscipline = await prismaService.discipline.create({
      data: entity.toJSON(),
    });

    const discipline = await sut.findById(createdDiscipline.id);

    expect(sut).not.toBeNull();
    expect(discipline.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should insert a new discipline', async () => {
    const entity = new DisciplineEntity(DisciplineDataBuilder({}));
    await sut.insert(entity);

  });

  it('should return one discipline if theres only one with find all', async () => {
    const entity = new DisciplineEntity(DisciplineDataBuilder({}));
    await sut.insert(entity);

    const disciplines = await sut.findAll();

    expect(disciplines).toHaveLength(1);
    expect(disciplines[0].toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should throw error when trying to update non-existent discipline', async () => {
    const nonExistentId = faker.string.uuid();
    const entity = new DisciplineEntity(DisciplineDataBuilder({}), nonExistentId);

    await expect(sut.update(entity)).rejects.toThrow(
      new DisciplineWithIdNotFoundError(nonExistentId),
    );
  });

  it('should update a discipline successfully', async () => { });

  it('should throw error when trying to delete non-existent discipline', async () => {
    const nonExistentId = faker.string.uuid();

    await expect(sut.delete(nonExistentId)).rejects.toThrow(
      new DisciplineWithIdNotFoundError(nonExistentId),
    );
  });

  it('should delete a discipline successfully', async () => {
    const entity = new DisciplineEntity(DisciplineDataBuilder({ name: 'John' }));
    await sut.insert(entity);

    await sut.delete(entity.id);

    const disciplineCount = await prismaService.discipline.count({
      where: { id: entity.id },
    });

    expect(disciplineCount).toBe(0);
  });


  describe('search tests', () => {
    it.todo('should return with default values', async () => { });

    it.todo('should paginate disciplines', async () => { });
  });
});
