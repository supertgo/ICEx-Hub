import { PrismaClient } from '@prisma/client';
import { DisciplinePrismaRepository } from '@/discipline/infrastructure/database/prisma/repositories/discipline-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import {
  setUpPrismaTest,
  resetDatabase,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { ListDisciplinesUsecase } from '@/discipline/application/usecases/list-discipline.usecase';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { faker } from '@faker-js/faker';
import { DisciplinePrismaTestingHelper } from '@/discipline/infrastructure/database/prisma/testing/discipline-prisma.testing-helper';
import { CoursePrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-prisma.testing-helper';
import { CoursePeriodPrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-period-prisma.testing-helper';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';

describe('List disciplines usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: DisciplinePrismaRepository;
  let sut: ListDisciplinesUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new DisciplinePrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new ListDisciplinesUsecase.UseCase(repository);
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should retrieve all disciplines from database and paginate', async () => {
    const disciplines = await DisciplinePrismaTestingHelper.createDisciplines(
      prismaService,
      11,
    );

    const output = await sut.execute({});

    expect(output).not.toBe(null);
    expect(output.items).toHaveLength(10);
    expect(output.total).toBe(11);
    expect(output.currentPage).toBe(1);
    expect(output.lastPage).toBe(2);
  });

  it('should filter disciplines by name', async () => {
    const discipline1 = await DisciplinePrismaTestingHelper.createDiscipline(
      prismaService,
      { name: 'Math' },
    );
    const discipline2 = await DisciplinePrismaTestingHelper.createDiscipline(
      prismaService,
      { name: 'Physics' },
    );

    const output = await sut.execute({
      filter: { name: 'Math' },
    });

    expect(output.items).toHaveLength(1);
    expect(output.items[0].name).toBe('Math');
  });

  it('should filter disciplines by code', async () => {
    const discipline1 = await DisciplinePrismaTestingHelper.createDiscipline(
      prismaService,
      { code: 'MATH123' },
    );
    const discipline2 = await DisciplinePrismaTestingHelper.createDiscipline(
      prismaService,
      { code: 'PHYS456' },
    );
    const output = await sut.execute({
      filter: { code: 'MATH123' },
    });

    expect(output.items).toHaveLength(1);
    expect(output.items[0].code).toBe('MATH123');
  });

  it('should filter disciplines by courseId', async () => {
    const course1 = await CoursePrismaTestingHelper.createCourse(prismaService);
    const course2 = await CoursePrismaTestingHelper.createCourse(prismaService);
    const discipline1 = await DisciplinePrismaTestingHelper.createDiscipline(
      prismaService,
      { courseId: course1.id },
    );
    const discipline2 = await DisciplinePrismaTestingHelper.createDiscipline(
      prismaService,
      { courseId: course2.id },
    );

    const output = await sut.execute({
      filter: { courseId: course1.id },
    });

    expect(output.items).toHaveLength(1);
    expect(output.items[0].courseId).toBe(course1.id);
  });

  it('should filter disciplines by coursePeriodId', async () => {
    const period1 =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);
    const period2 =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    const discipline1 = await DisciplinePrismaTestingHelper.createDiscipline(
      prismaService,
      { coursePeriodId: period1.id, courseId: period1.courseId },
    );
    const discipline2 = await DisciplinePrismaTestingHelper.createDiscipline(
      prismaService,
      { coursePeriodId: period2.id, courseId: period2.courseId },
    );

    const output = await sut.execute({
      filter: { coursePeriodId: period1.id },
    });

    expect(output.items).toHaveLength(1);
    expect(output.items[0].coursePeriodId).toBe(period1.id);
  });

  it('should sort disciplines by name in ascending order', async () => {
    const discipline1 = await DisciplinePrismaTestingHelper.createDiscipline(
      prismaService,
      { name: 'Physics' },
    );
    const discipline2 = await DisciplinePrismaTestingHelper.createDiscipline(
      prismaService,
      { name: 'Math' },
    );

    const output = await sut.execute({
      sort: 'name',
      sortDir: SortOrderEnum.ASC,
    });

    expect(output.items).toHaveLength(2);
    expect(output.items[0].name).toBe('Math');
    expect(output.items[1].name).toBe('Physics');
  });

  it('should sort disciplines by name in descending order', async () => {
    const discipline1 = await DisciplinePrismaTestingHelper.createDiscipline(
      prismaService,
      { name: 'Physics' },
    );
    const discipline2 = await DisciplinePrismaTestingHelper.createDiscipline(
      prismaService,
      { name: 'Math' },
    );

    const output = await sut.execute({
      sort: 'name',
      sortDir: SortOrderEnum.DESC,
    });

    expect(output.items).toHaveLength(2);
    expect(output.items[0].name).toBe('Physics');
    expect(output.items[1].name).toBe('Math');
  });

  it('should return empty result when no disciplines match the filter', async () => {
    const course = await CoursePrismaTestingHelper.createCourse(prismaService);

    const discipline2 = await DisciplinePrismaTestingHelper.createDiscipline(
      prismaService,
      { name: 'Math', courseId: course.id },
    );

    const output = await sut.execute({
      filter: { name: 'Biology' },
    });

    expect(output.items).toHaveLength(0);
    expect(output.total).toBe(0);
  });

  it('should get discipline regardless of special characters using name filter', async () => {
    await DisciplinePrismaTestingHelper.createDiscipline(prismaService, {
      name: 'çáãéíóú',
    });

    const output = await sut.execute({
      filter: {
        name: 'caaeiou',
      },
    });

    expect(output.items).toHaveLength(1);
    expect(output.items[0].name).toBe('çáãéíóú');
  });
});
