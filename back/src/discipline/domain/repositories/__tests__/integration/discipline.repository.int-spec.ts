import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { PrismaClient } from '@prisma/client';
import { DisciplinePrismaRepository } from '@/discipline/infrastructure/database/prisma/repositories/discipline-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { faker } from '@faker-js/faker';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';
import { DisciplinePrismaTestingHelper } from '@/discipline/infrastructure/database/prisma/testing/discipline-prisma.testing-helper';

describe('Discipline prisma repository integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: DisciplinePrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    repository = new DisciplinePrismaRepository(prismaService as any);
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when entity does not exist', async () => {
    const nonExistentId = faker.string.uuid();
    await expect(repository.findById(nonExistentId)).rejects.toThrow(
      new DisciplineWithIdNotFoundError(nonExistentId),
    );
  });

  it('should find discipline by id', async () => {
    const createdDiscipline =
      await DisciplinePrismaTestingHelper.createDiscipline(prismaService);

    const discipline = await repository.findById(createdDiscipline.id);

    expect(discipline).not.toBeNull();
    expect(discipline.toJSON()).toStrictEqual({
      id: createdDiscipline.id,
      name: createdDiscipline.name,
      code: createdDiscipline.code,
      courseId: createdDiscipline.courseId,
      coursePeriodId: createdDiscipline.coursePeriodId,
      createdAt: createdDiscipline.createdAt,
      updatedAt: createdDiscipline.updatedAt,
    });
  });

  it('should insert a new discipline', async () => {
    const discipline =
      await DisciplinePrismaTestingHelper.createDiscipline(prismaService);

    const insertedDiscipline = await prismaService.discipline.findUnique({
      where: { id: discipline.id },
    });

    expect(insertedDiscipline).not.toBeNull();
    expect(insertedDiscipline).toStrictEqual(discipline);
  });

  it('should return one discipline if there is only one with find all', async () => {
    const discipline =
      await DisciplinePrismaTestingHelper.createDiscipline(prismaService);

    const disciplines = await repository.findAll();

    expect(disciplines).toHaveLength(1);
    expect(disciplines[0].toJSON()).toStrictEqual(discipline);
  });

  it('should throw error when trying to update non-existent discipline', async () => {
    const nonExistentId = faker.string.uuid();
    const entity = new DisciplineEntity(
      DisciplineDataBuilder({}),
      nonExistentId,
    );

    await expect(repository.update(entity)).rejects.toThrow(
      new DisciplineWithIdNotFoundError(nonExistentId),
    );
  });

  it('should update a discipline successfully', async () => {
    const createdDiscipline =
      await DisciplinePrismaTestingHelper.createDiscipline(prismaService, {
        name: 'Old Name',
      });

    createdDiscipline.name = 'New Name';
    await repository.update(createdDiscipline as unknown as DisciplineEntity);

    const updatedDiscipline = await prismaService.discipline.findUnique({
      where: { id: createdDiscipline.id },
    });

    expect(updatedDiscipline).not.toBeNull();
    expect(updatedDiscipline?.name).toBe('New Name');
  });

  it('should throw error when trying to delete non-existent discipline', async () => {
    const nonExistentId = faker.string.uuid();

    await expect(repository.delete(nonExistentId)).rejects.toThrow(
      new DisciplineWithIdNotFoundError(nonExistentId),
    );
  });

  it('should delete a discipline successfully', async () => {
    const createdDiscipline =
      await DisciplinePrismaTestingHelper.createDiscipline(prismaService, {
        name: 'Discipline to Delete',
      });

    await repository.delete(createdDiscipline.id);
    const disciplineCount = await prismaService.discipline.count({
      where: { id: createdDiscipline.id },
    });

    expect(disciplineCount).toBe(0);
  });
});
