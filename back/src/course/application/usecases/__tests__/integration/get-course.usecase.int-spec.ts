import { PrismaClient } from '@prisma/client';
import { CoursePrismaRepository } from '@/course/infrastructure/database/prisma/repositories/course-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { GetCourseUsecase } from '@/course/application/usecases/get-course.usecase';
import { CourseWithIdNotFoundError } from '@/course/infrastructure/Errors/course-with-id-not-found-error';
import { faker } from '@faker-js/faker';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';

describe('Get course usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: CoursePrismaRepository;
  let sut: GetCourseUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new CoursePrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new GetCourseUsecase.UseCase(repository);
    await prismaService.course.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when course not found', () => {
    const id = faker.string.uuid();
    expect(() => sut.execute({ id })).rejects.toThrow(
      new CourseWithIdNotFoundError(id),
    );
  });

  it('should retrieve a course', async () => {
    const course = await prismaService.course.create({ data: CourseDataBuilder({})});

    const output = await sut.execute({ id: course.id });

    expect(output).toBeDefined();
    expect(output).toMatchObject(course);
  });
});
