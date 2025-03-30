import { PrismaClient } from '@prisma/client';
import { CoursePrismaRepository } from '@/course/infrastructure/database/prisma/repositories/course-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { ListCoursesUsecase } from '@/course/application/usecases/list-course.usecase';
import { CourseEntity } from '@/course/domain/entities/course.entity';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

describe('List courses usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: CoursePrismaRepository;
  let sut: ListCoursesUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new CoursePrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new ListCoursesUsecase.UseCase(repository);
    await prismaService.course.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });
  it('should retrieve users orderedBy createdAt as default', async () => {
    const entities = CourseEntity.fake().theCourses(11).build();

    await prismaService.course.createMany({
      data: entities,
    });

    const output = await sut.execute({});

    expect(output).not.toBeNull();
    expect(output.items).toHaveLength(10);
    expect(output.total).toBe(11);
    expect(output.currentPage).toBe(1);
    expect(output.lastPage).toBe(2);
  });

  it('should returns output using filter, sort and paginate', async () => {
    const createdAt = new Date();
    const entities = [
      CourseEntity.fake()
        .aCourse()
        .withCreatedAt(createdAt)
        .withName('test')
        .build(),
      CourseEntity.fake()
        .aCourse()
        .withCreatedAt(new Date(createdAt.getTime() + 2))
        .withName('Test')
        .build(),
      CourseEntity.fake()
        .aCourse()
        .withCreatedAt(new Date(createdAt.getTime() + 1))
        .withCode('TEST')
        .withName('asdasd')
        .build(),
      CourseEntity.fake()
        .aCourse()
        .withCreatedAt(new Date(createdAt.getTime() + 3))
        .withName('asd')
        .build(),
      CourseEntity.fake()
        .aCourse()
        .withCreatedAt(new Date(createdAt.getTime() + 4))
        .withName('aasdsad')
        .withCode('TeSt')
        .build(),
    ];

    await prismaService.course.createMany({ data: entities });

    let output = await sut.execute({
      page: 1,
      perPage: 2,
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
      items: [entities[1].toJSON(), entities[4].toJSON()],
      total: 3,
      currentPage: 2,
      perPage: 2,
      lastPage: 2,
    });
  });
});
