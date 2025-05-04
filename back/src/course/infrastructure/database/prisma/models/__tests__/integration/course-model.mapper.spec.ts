import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { Course } from '@prisma/client';
import { CourseModelMapper } from '@/course/infrastructure/database/prisma/models/course-model.mapper';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';
import { CourseEntity } from '@/course/domain/entities/course.entity';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';
import { CoursePrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-prisma.testing-helper';

describe('Course model mapper integration tests', () => {
  let prismaService: PrismaService;
  let props: any;

  beforeAll(async () => {
    setUpPrismaTest();

    prismaService = new PrismaService();
    props = CourseDataBuilder({});
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throw error when course model is invalid', () => {
    const model: Course = Object.assign({}, props, { name: null });

    expect(() => CourseModelMapper.toEntity(model)).toThrow(
      new ValidationErrors('Could not load course having id undefined'),
    );
  });

  it('should map course model to entity', async () => {
    const model = await CoursePrismaTestingHelper.createCourse(prismaService);

    const sut = CourseModelMapper.toEntity(model as Course);

    expect(sut).toBeInstanceOf(CourseEntity);
  });
});
