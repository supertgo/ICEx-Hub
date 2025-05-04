import { PrismaClient } from '@prisma/client';
import { CoursePrismaRepository } from '@/course/infrastructure/database/prisma/repositories/course-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { ListCoursesUsecase } from '@/course/application/usecases/list-course.usecase';
import { CourseEntity } from '@/course/domain/entities/course.entity';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { sanitizeString } from '@/shared/domain/helper/sanitize-string.helper';

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
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  const createSanitizedCourses = async (entities: CourseEntity[]) => {
    return prismaService.course.createMany({
      data: entities.map((course) => ({
        ...course.toJSON(),
        sanitized_name: sanitizeString(course.name),
      })),
    });
  };

  it('should retrieve courses orderedBy createdAt as default', async () => {
    const entities = CourseEntity.fake().theCourses(11).build();
    await createSanitizedCourses(entities);

    const output = await sut.execute({});

    expect(output).toMatchObject({
      items: expect.arrayContaining([expect.any(Object)]),
      total: 11,
      currentPage: 1,
      perPage: 10,
      lastPage: 2,
    });
  });

  it('should filter courses case-insensitively', async () => {
    const entities = [
      CourseEntity.fake().aCourse().withName('JavaScript').build(),
      CourseEntity.fake().aCourse().withName('Typescript').build(),
      CourseEntity.fake().aCourse().withName('Python').build(),
    ];
    await createSanitizedCourses(entities);

    const output = await sut.execute({
      filter: 'javascript',
    });

    expect(output.items).toHaveLength(1);
    expect(output.items[0].name).toBe('JavaScript');
  });

  it('should filter courses with special characters', async () => {
    const entities = [
      CourseEntity.fake().aCourse().withName('C# Programming').build(),
      CourseEntity.fake().aCourse().withName('Node.js').build(),
    ];
    await createSanitizedCourses(entities);

    const output = await sut.execute({
      filter: 'c programming',
    });

    expect(output.items).toHaveLength(1);
    expect(output.items[0].name).toBe('C# Programming');
  });

  it('should filter courses with accented characters', async () => {
    const entities = [
      CourseEntity.fake().aCourse().withName('Café').build(),
      CourseEntity.fake().aCourse().withName('École').build(),
    ];
    await createSanitizedCourses(entities);

    const output1 = await sut.execute({ filter: 'cafe' });
    expect(output1.items).toHaveLength(1);
    expect(output1.items[0].name).toBe('Café');

    const output2 = await sut.execute({ filter: 'ecole' });
    expect(output2.items).toHaveLength(1);
    expect(output2.items[0].name).toBe('École');
  });

  it('should paginate results correctly', async () => {
    const entities = CourseEntity.fake().theCourses(25).build();
    await createSanitizedCourses(entities);

    const output = await sut.execute({
      page: 2,
      perPage: 10,
    });

    expect(output).toMatchObject({
      items: expect.arrayContaining([expect.any(Object)]),
      total: 25,
      currentPage: 2,
      perPage: 10,
      lastPage: 3,
    });
  });

  it('should sort results by name in ascending order', async () => {
    const entities = [
      CourseEntity.fake().aCourse().withName('Zebra').build(),
      CourseEntity.fake().aCourse().withName('Apple').build(),
      CourseEntity.fake().aCourse().withName('Banana').build(),
    ];
    await createSanitizedCourses(entities);

    const output = await sut.execute({
      sort: 'name',
      sortDir: SortOrderEnum.ASC,
    });

    expect(output.items.map((i) => i.name)).toEqual([
      'Apple',
      'Banana',
      'Zebra',
    ]);
  });

  it('should search by code field', async () => {
    const entities = [
      CourseEntity.fake().aCourse().withCode('CS-101').build(),
      CourseEntity.fake().aCourse().withCode('MATH-202').build(),
    ];
    await createSanitizedCourses(entities);

    const output = await sut.execute({
      filter: 'CS-101',
    });

    expect(output.items).toHaveLength(1);
    expect(output.items[0].code).toBe('CS-101');
  });

  it('should return empty array when no matches found', async () => {
    const entities = CourseEntity.fake().theCourses(3).build();
    await createSanitizedCourses(entities);

    const output = await sut.execute({
      filter: 'nonexistent',
    });

    expect(output.items).toHaveLength(0);
    expect(output.total).toBe(0);
  });
});
