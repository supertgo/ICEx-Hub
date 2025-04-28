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
    const course = await prismaService.course.create({
      data: {
        id: 'course-1',
        name: 'Course 1',
        code: 'C1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    for (let i = 0; i < 11; i++) {
      const discipline = DisciplineDataBuilder({
        name: `Discipline ${i}`,
        courseId: course.id,
      });
      await prismaService.discipline.create({ data: discipline });
    }

    const output = await sut.execute({});

    expect(output).not.toBe(null);
    expect(output.items).toHaveLength(10);
    expect(output.total).toBe(11);
    expect(output.currentPage).toBe(1);
    expect(output.lastPage).toBe(2);
  });

  it('should filter disciplines by name', async () => {
    const discipline1 = DisciplineDataBuilder({ name: 'Math' });
    const discipline2 = DisciplineDataBuilder({ name: 'Physics' });
    await prismaService.discipline.create({ data: discipline1 });
    await prismaService.discipline.create({ data: discipline2 });

    const output = await sut.execute({
      filter: JSON.stringify({ name: 'Math' }),
    });

    expect(output.items).toHaveLength(1);
    expect(output.items[0].name).toBe('Math');
  });

  it('should filter disciplines by code', async () => {
    const discipline1 = DisciplineDataBuilder({ code: 'MATH123' });
    const discipline2 = DisciplineDataBuilder({ code: 'PHYS456' });
    await prismaService.discipline.create({ data: discipline1 });
    await prismaService.discipline.create({ data: discipline2 });

    const output = await sut.execute({
      filter: JSON.stringify({ code: 'MATH123' }),
    });

    expect(output.items).toHaveLength(1);
    expect(output.items[0].code).toBe('MATH123');
  });

  it('should filter disciplines by courseId', async () => {
    const discipline1 = DisciplineDataBuilder({ courseId: 'course-1' });
    const discipline2 = DisciplineDataBuilder({ courseId: 'course-2' });
    await prismaService.discipline.create({ data: discipline1 });
    await prismaService.discipline.create({ data: discipline2 });

    const output = await sut.execute({
      filter: JSON.stringify({ courseId: 'course-1' }),
    });

    expect(output.items).toHaveLength(1);
    expect(output.items[0].courseId).toBe('course-1');
  });

  it('should filter disciplines by coursePeriodId', async () => {
    const discipline1 = DisciplineDataBuilder({ coursePeriodId: 'period-1' });
    const discipline2 = DisciplineDataBuilder({ coursePeriodId: 'period-2' });
    await prismaService.discipline.create({ data: discipline1 });
    await prismaService.discipline.create({ data: discipline2 });

    const output = await sut.execute({
      filter: JSON.stringify({ coursePeriodId: 'period-1' }),
    });

    expect(output.items).toHaveLength(1);
    expect(output.items[0].coursePeriodId).toBe('period-1');
  });

  it('should sort disciplines by name in ascending order', async () => {
    const discipline1 = DisciplineDataBuilder({ name: 'Physics' });
    const discipline2 = DisciplineDataBuilder({ name: 'Math' });
    await prismaService.discipline.create({ data: discipline1 });
    await prismaService.discipline.create({ data: discipline2 });

    const output = await sut.execute({
      sort: 'name',
      sortDir: SortOrderEnum.ASC,
    });

    expect(output.items).toHaveLength(2);
    expect(output.items[0].name).toBe('Math');
    expect(output.items[1].name).toBe('Physics');
  });

  it('should sort disciplines by name in descending order', async () => {
    const discipline1 = DisciplineDataBuilder({ name: 'Physics' });
    const discipline2 = DisciplineDataBuilder({ name: 'Math' });
    await prismaService.discipline.create({ data: discipline1 });
    await prismaService.discipline.create({ data: discipline2 });

    const output = await sut.execute({
      sort: 'name',
      sortDir: SortOrderEnum.DESC,
    });

    expect(output.items).toHaveLength(2);
    expect(output.items[0].name).toBe('Physics');
    expect(output.items[1].name).toBe('Math');
  });

  it('should return empty result when no disciplines match the filter', async () => {
    const course = await prismaService.course.create({
      data: {
        id: 'course-1',
        name: 'Course 1',
        code: 'C1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const discipline = DisciplineDataBuilder({
      name: 'Math',
      courseId: course.id,
    });
    await prismaService.discipline.create({ data: discipline });

    const output = await sut.execute({
      filter: JSON.stringify({ name: 'Biology' }),
    });

    expect(output.items).toHaveLength(0);
    expect(output.total).toBe(0);
  });
});
