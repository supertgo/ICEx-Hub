import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { CoursePrismaRepository } from '@/course/infrastructure/database/prisma/repositories/course-prisma.repository';
import { CreateCourseUsecase } from '@/course/application/usecases/create-course.usecase';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';

describe('Create course usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: CoursePrismaRepository;
  let sut: CreateCourseUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new CoursePrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new CreateCourseUsecase.UseCase(repository);
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should create a course', async () => {
    const input = CourseDataBuilder({});

    const output = await sut.execute(input);

    expect(output).toBeDefined();
    expect(output).toMatchObject(input);

    expect(await prismaService.course.count()).toBe(1);
  });
});
