import { resetDatabase, setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { PrismaClient } from '@prisma/client';
import { CoursePrismaRepository } from '@/course/infrastructure/database/prisma/repositories/course-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { CourseEntity } from '@/course/domain/entities/course.entity';
import { faker } from '@faker-js/faker';
import { CourseWithIdNotFoundError } from '@/course/infrastructure/errors/course-with-id-not-found-error';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';

describe('Course prisma repository integration tests', () => {
  const prismaService = new PrismaClient();
  let sut: CoursePrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new CoursePrismaRepository(prismaService as any);
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when entity does not exist', () => {
    expect(() => sut.findById('1')).rejects.toThrow(
      new CourseWithIdNotFoundError('1'),
    );
  });

  it('should find course by id', async () => {
    const entity = new CourseEntity(CourseDataBuilder({}));

    const createdCourse = await prismaService.course.create({
      data: entity.toJSON(),
    });

    const course = await sut.findById(createdCourse.id);

    expect(sut).not.toBeNull();
    expect(course.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should insert a new course', async () => {
    const entity = new CourseEntity(CourseDataBuilder({}));
    await sut.insert(entity);
  });

  it('should return one course if theres only one with find all', async () => {
    const entity = new CourseEntity(CourseDataBuilder({}));
    await sut.insert(entity);

    const courses = await sut.findAll();

    expect(courses).toHaveLength(1);
    expect(courses[0].toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should throw error when trying to update non-existent course', async () => {
    const nonExistentId = faker.string.uuid();
    const entity = new CourseEntity(CourseDataBuilder({}), nonExistentId);

    await expect(sut.update(entity)).rejects.toThrow(
      new CourseWithIdNotFoundError(nonExistentId),
    );
  });

  it('should update a course successfully', async () => {});

  it('should throw error when trying to delete non-existent course', async () => {
    const nonExistentId = faker.string.uuid();

    await expect(sut.delete(nonExistentId)).rejects.toThrow(
      new CourseWithIdNotFoundError(nonExistentId),
    );
  });

  it('should delete a course successfully', async () => {
    const entity = new CourseEntity(CourseDataBuilder({ name: 'John' }));
    await sut.insert(entity);

    await sut.delete(entity.id);

    const courseCount = await prismaService.course.count({
      where: { id: entity.id },
    });

    expect(courseCount).toBe(0);
  });
});
