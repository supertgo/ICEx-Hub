import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { CoursePeriodPrismaRepository } from '@/course/infrastructure/database/prisma/repositories/course-period-prisma.repository';
import { ListCoursePeriodUsecase } from '@/course/application/usecases/list-course-period.usecase';
import { CoursePeriodEntity } from '@/course/domain/entities/course-period.entity';
import { CoursePrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-prisma.testing-helper';

describe('List course period usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: CoursePeriodPrismaRepository;
  let sut: ListCoursePeriodUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new CoursePeriodPrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new ListCoursePeriodUsecase.UseCase(repository);
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });
  it('should retrieve course periods orderedBy createdAt as default', async () => {
    await CoursePrismaTestingHelper.createCoursePeriods(prismaService, 11);

    const output = await sut.execute({});

    expect(output).not.toBeNull();
    expect(output.items).toHaveLength(10);
    expect(output.total).toBe(11);
    expect(output.currentPage).toBe(1);
    expect(output.lastPage).toBe(2);
  });

  it('should returns output using filter, sort and paginate', async () => {
    const createdAt = new Date();
    const course = await CoursePrismaTestingHelper.createCourse(prismaService);

    const entities = [
      CoursePeriodEntity.fake()
        .aCoursePeriod()
        .withCourseId(course.id)
        .withCreatedAt(createdAt)
        .withName('test')
        .build(),
      CoursePeriodEntity.fake()
        .aCoursePeriod()
        .withCourseId(course.id)
        .withCreatedAt(new Date(createdAt.getTime() + 2))
        .withName('Test')
        .build(),
      CoursePeriodEntity.fake()
        .aCoursePeriod()
        .withCourseId(course.id)
        .withCreatedAt(new Date(createdAt.getTime() + 1))
        .withName('asdasd')
        .build(),
      CoursePeriodEntity.fake()
        .aCoursePeriod()
        .withCourseId(course.id)
        .withCreatedAt(new Date(createdAt.getTime() + 3))
        .withName('TeSt')
        .build(),
      CoursePeriodEntity.fake()
        .aCoursePeriod()
        .withCourseId(course.id)
        .withCreatedAt(new Date(createdAt.getTime() + 4))
        .withName('aasdsad')
        .build(),
    ];

    await prismaService.coursePeriod.createMany({ data: entities });

    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'createdAt',
      sortDir: SortOrderEnum.ASC,
      filter: 'TEST',
    });

    expect(output).toMatchObject({
      items: [entities[0].toJSON(), entities[1].toJSON()],
      total: 3,
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
    });

    output = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'name',
      sortDir: SortOrderEnum.ASC,
      filter: 'TEST',
    });

    expect(output).toMatchObject({
      items: [entities[3].toJSON()],
      total: 3,
      currentPage: 2,
      perPage: 2,
      lastPage: 2,
    });
  });
});
