import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { ClassroomDataBuilder } from '@/classroom/domain/testing/helper/classroom-data-builder';
import { PrismaClient } from '@prisma/client';
import { ClassroomPrismaRepository } from '@/classroom/infrastructure/database/prisma/repositories/classroom-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { faker } from '@faker-js/faker';
import { ClassroomRepository } from '@/classroom/domain/repositories/classroom.repository';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ClassroomWithEmailNotFoundError } from '@/classroom/domain/errors/classroom-with-email-not-found-error';
import { ClassroomWithIdNotFoundError } from '@/classroom/infrastructure/errors/classroom-with-id-not-found-error';
import { EmailAlreadyInUseError } from '@/classroom/domain/errors/email-already-in-use-error';

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
    expect(() => sut.findById('1')).rejects.toThrowError(
      new ClassroomWithIdNotFoundError('1'),
    );
  });

  it('should find classroom by id', async () => {
    const entity = new ClassroomEntity(ClassroomDataBuilder({}));

    const createdClassroom = await prismaService.classroom.create({
      data: entity.toJSON(),
    });

    const classroom = await sut.findById(createdClassroom.id);

    expect(sut).not.toBeNull();
    expect(classroom.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should insert a new classroom', async () => {
    const entity = new ClassroomEntity(ClassroomDataBuilder({}));
    await sut.insert(entity);

  });

  it('should return one classroom if theres only one with find all', async () => {
    const entity = new ClassroomEntity(ClassroomDataBuilder({}));
    await sut.insert(entity);

    const classrooms = await sut.findAll();

    expect(classrooms).toHaveLength(1);
    expect(classrooms[0].toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should throw error when trying to update non-existent classroom', async () => {
    const nonExistentId = faker.string.uuid();
    const entity = new ClassroomEntity(ClassroomDataBuilder({}), nonExistentId);

    await expect(sut.update(entity)).rejects.toThrowError(
      new ClassroomWithIdNotFoundError(nonExistentId),
    );
  });

  it('should update a classroom successfully', async () => { });

  it('should throw error when trying to delete non-existent classroom', async () => {
    const nonExistentId = faker.string.uuid();

    await expect(sut.delete(nonExistentId)).rejects.toThrowError(
      new ClassroomWithIdNotFoundError(nonExistentId),
    );
  });

  it('should delete a classroom successfully', async () => {
    const entity = new ClassroomEntity(ClassroomDataBuilder({ name: 'John' }));
    await sut.insert(entity);

    await sut.delete(entity.id);

    const classroomCount = await prismaService.classroom.count({
      where: { id: entity.id },
    });

    expect(classroomCount).toBe(0);
  });


  describe('search tests', () => {
    it.todo('should return with default values', async () => { });

    it.todo('should paginate classrooms', async () => { });
  });
});
