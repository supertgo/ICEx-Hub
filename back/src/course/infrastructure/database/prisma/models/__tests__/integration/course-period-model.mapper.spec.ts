import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { CoursePeriod } from '@prisma/client';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { CoursePeriodDataBuilder } from '@/user/domain/testing/helper/course-period-data-builder';
import { CoursePeriodModelMapper } from '@/course/infrastructure/database/prisma/models/course-period-model.mapper';
import { CoursePeriodPrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-period-prisma.testing-helper';
import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';

describe('Course Period model mapper integration tests', () => {
  let prismaService: PrismaService;
  let props: any;

  beforeAll(async () => {
    setUpPrismaTest();

    prismaService = new PrismaService();
    props = CoursePeriodDataBuilder({});
    await prismaService.$connect();
  });

  beforeEach(() => {
    prismaService.course.deleteMany();
    prismaService.coursePeriod.deleteMany();
  });

  afterAll(async () => {
    prismaService.course.deleteMany();
    prismaService.coursePeriod.deleteMany();
    await prismaService.$disconnect();
  });

  it('should throw error when course period model is invalid', () => {
    const model: CoursePeriod = Object.assign({}, props, { name: null });

    expect(() => CoursePeriodModelMapper.toEntity(model)).toThrowError(
      new ValidationErrors('Could not load course period having id undefined'),
    );
  });

  it('should map course period model to entity', async () => {
    const model =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    const sut = CoursePeriodModelMapper.toEntity(model as CoursePeriod);

    expect(sut).toBeInstanceOf(CoursePeriodEntity);
  });
});
