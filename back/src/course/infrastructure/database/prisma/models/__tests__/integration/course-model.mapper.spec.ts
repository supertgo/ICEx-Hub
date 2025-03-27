import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { Course } from '@prisma/client';
import { CourseModelMapper } from '@/course/infrastructure/database/prisma/models/course-model.mapper';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';
import { CourseEntity } from '@/course/domain/entities/course.entity';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { CourseDataBuilder } from '@/user/domain/testing/helper/course-data-builder';

describe('Course model mapper integration tests', () => {
  let prismaService: PrismaService;
  let props: any;

  beforeAll(async () => {
    setUpPrismaTest();
    
    prismaService = new PrismaService();
    props = CourseDataBuilder({});
    await prismaService.$connect();
  });

  beforeEach(() => {
    prismaService.course.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throw error when course model is invalid', () => {
    const model: Course = Object.assign({}, props, { name: null });

    expect(() => CourseModelMapper.toEntity(model)).toThrowError(
      new ValidationErrors('Could not load course having id undefined'),
    );
  });

  it('should map course model to entity', async () => {
    const model = await prismaService.course.create({
      data: props,
    });

    const sut = CourseModelMapper.toEntity(model as Course);

    expect(sut).toBeInstanceOf(CourseEntity);

  });
});
