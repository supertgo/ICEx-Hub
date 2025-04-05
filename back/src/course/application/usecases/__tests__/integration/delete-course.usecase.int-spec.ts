import { PrismaClient } from '@prisma/client';
import { CoursePrismaRepository } from '@/course/infrastructure/database/prisma/repositories/course-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { resetDatabase, setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DeleteCourseUsecase } from '@/course/application/usecases/delete-course.usecase';
import { CourseWithIdNotFoundError } from '@/course/infrastructure/Errors/course-with-id-not-found-error';
import { faker } from '@faker-js/faker';
import {
  CoursePrismaTestingHelper,
} from '@/course/infrastructure/database/prisma/testing/course-prisma.testing-helper';

describe('Delete Course usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: CoursePrismaRepository;
  let sut: DeleteCourseUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new CoursePrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new DeleteCourseUsecase.UseCase(repository);
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when course not found', () => {
    const id = faker.string.uuid();
    expect(() => sut.execute({ id })).rejects.toThrowError(
      new CourseWithIdNotFoundError(id),
    );
  });

  it('should delete a course', async () => {
    const course = await CoursePrismaTestingHelper.createCourse(prismaService);

    await sut.execute({ id: course.id });

    const count = await prismaService.course.count();

    expect(count).toBe(0);
  });
});
