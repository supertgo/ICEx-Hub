import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { PrismaClient } from '@prisma/client';
import { ClassroomPrismaRepository } from '@/classroom/infrastructure/database/prisma/repositories/classroom-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { ClassroomWithIdNotFoundError } from '@/classroom/infrastructure/errors/classroom-with-id-not-found';
import { faker } from '@faker-js/faker';
import { ClassroomRepository } from '../../classroom.repository';
import { CLASSROOM_BUILDING } from '@/classroom/domain/classroom.constants';

describe('Classroom prisma repository integration tests', () => {
  const prismaService = new PrismaClient();
  let sut: ClassroomPrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new ClassroomPrismaRepository(prismaService as any);
    await prismaService.classroom.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when entity does not exist', () => {
    expect(() => sut.findById('1')).rejects.toThrow(
      new ClassroomWithIdNotFoundError('1'),
    );
  });

  it('should find classroom by id', async () => {
    const entity = ClassroomEntity.fake().aCADClassroom().build();

    const createdClassroom = await prismaService.classroom.create({
      data: entity.toJSON(),
    });

    const classroom = await sut.findById(createdClassroom.id);

    expect(sut).not.toBeNull();
    expect(classroom.toJSON()).toEqual(
      expect.objectContaining({
        ...entity.toJSON(),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should insert a new classroom', async () => {
    const entity = ClassroomEntity.fake().aCADClassroom().build();

    await sut.insert(entity);

    const classroom = await prismaService.classroom.findFirst({
      where: { id: entity.id },
    });

    expect(classroom).not.toBeNull();
    expect(classroom).toEqual(
      expect.objectContaining({
        ...entity.toJSON(),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should return one classroom if theres only one with find all', async () => {
    const entity = ClassroomEntity.fake().aCADClassroom().build();
    await sut.insert(entity);

    const classrooms = await sut.findAll();

    expect(classrooms).toHaveLength(1);
    expect(classrooms[0].toJSON()).toEqual(
      expect.objectContaining({
        ...entity.toJSON(),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should throw error when trying to update non-existent classroom', async () => {
    const entity = ClassroomEntity.fake().aCADClassroom().build();

    await expect(sut.update(entity)).rejects.toThrow(
      new ClassroomWithIdNotFoundError(entity.id),
    );
  });

  it('should update only a classroom name successfully', async () => {
    const entity = ClassroomEntity.fake().aIcexClassroom().build();
    await sut.insert(entity);

    entity.updateName('Sala 1026');
    await sut.update(entity);

    const updatedClassroom = await prismaService.classroom.findUnique({
      where: {
        id: entity.id,
      },
    });

    expect(updatedClassroom.name).toBe('Sala 1026');
  });

  it('should update only a classroom building successfully', async () => {
    const entity = ClassroomEntity.fake().aCADClassroom().build();
    await sut.insert(entity);

    entity.updateBuilding(CLASSROOM_BUILDING.ICEX);
    await sut.update(entity);

    const updatedClassroom = await prismaService.classroom.findUnique({
      where: {
        id: entity.id,
      },
    });

    expect(updatedClassroom.building).toBe(CLASSROOM_BUILDING.ICEX);
  });

  it('should update a classroom building and name successfully', async () => {
    const entity = ClassroomEntity.fake().aIcexClassroom().build();
    await sut.insert(entity);

    entity.updateBuilding(CLASSROOM_BUILDING.CAD3);
    entity.updateName('212');
    await sut.update(entity);

    const updatedClassroom = await prismaService.classroom.findUnique({
      where: {
        id: entity.id,
      },
    });

    expect(updatedClassroom.building).toBe(CLASSROOM_BUILDING.CAD3);
    expect(updatedClassroom.name).toBe('212');
  });

  it('should update neither a classroom building or name', async () => {
    const entity = ClassroomEntity.fake().aIcexClassroom().build();
    await sut.insert(entity);

    await sut.update(entity);

    const updatedClassroom = await prismaService.classroom.findUnique({
      where: {
        id: entity.id,
      },
    });

    expect(updatedClassroom.building).toBe(entity.building);
    expect(updatedClassroom.name).toBe(entity.name);
  });

  it('should throw error when trying to delete non-existent classroom', async () => {
    const nonExistentId = faker.string.uuid();

    await expect(sut.delete(nonExistentId)).rejects.toThrow(
      new ClassroomWithIdNotFoundError(nonExistentId),
    );
  });

  it('should delete a classroom successfully', async () => {
    const entity = ClassroomEntity.fake().aCADClassroom().build();
    await sut.insert(entity);

    await sut.delete(entity.id);

    const classroomCount = await prismaService.classroom.count({
      where: { id: entity.id },
    });

    expect(classroomCount).toBe(0);
  });

  describe('search tests', () => {
    it('should return with default values', async () => {
      const entities: ClassroomEntity[] = [];
      const createdAt = new Date();

      for (let i = 0; i < 11; i++) {
        const entity = ClassroomEntity.fake()
          .aIcexClassroom()
          .withCreatedAt(new Date(createdAt.getTime() + i))
          .build();

        await sut.insert(entity);

        entities.push(entity);
      }

      const searchResult = await sut.search(
        new ClassroomRepository.SearchParams(),
      );

      expect(searchResult).not.toBeNull();
      expect(searchResult).toBeInstanceOf(ClassroomRepository.SearchResult);
      expect(searchResult.items).toHaveLength(10);
      expect(searchResult.total).toBe(11);
    });
  });
});
