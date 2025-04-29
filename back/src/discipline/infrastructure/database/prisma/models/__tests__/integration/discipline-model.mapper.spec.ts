import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { Discipline } from '@prisma/client';
import { DisciplineModelMapper } from '@/discipline/infrastructure/database/prisma/models/discipline-model.mapper';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { CoursePrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-prisma.testing-helper';
import { CoursePeriodPrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-period-prisma.testing-helper';

describe('Discipline model mapper integration tests', () => {
  let prismaService: PrismaService;
  let props: any;

  beforeAll(async () => {
    setUpPrismaTest();
    prismaService = new PrismaService();
    props = DisciplineDataBuilder({});
    await prismaService.$connect();
  });

  beforeEach(() => {
    prismaService.discipline.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throw error when discipline model is invalid', () => {
    const model: Discipline = Object.assign({}, props, { name: null });

    expect(() => DisciplineModelMapper.toEntity(model)).toThrow(
      new ValidationErrors('Could not load discipline having id undefined'),
    );
  });

  it('should map discipline model to entity', async () => {
    const course = await CoursePrismaTestingHelper.createCourse(prismaService);
    const coursePeriod =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    const discipline = await prismaService.discipline.create({
      data: {
        name: 'Original Discipline Name',
        code: 'DISC123',
        courseId: course.id,
        coursePeriodId: coursePeriod.id,
      },
    });

    const sut = DisciplineModelMapper.toEntity(discipline as Discipline);

    expect(sut).toBeInstanceOf(DisciplineEntity);
  });
});
