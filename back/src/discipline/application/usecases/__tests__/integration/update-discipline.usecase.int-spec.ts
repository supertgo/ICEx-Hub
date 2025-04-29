import { PrismaClient } from '@prisma/client';
import { DisciplinePrismaRepository } from '@/discipline/infrastructure/database/prisma/repositories/discipline-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';
import { UpdateDisciplineUsecase } from '@/discipline/application/usecases/update-discipline.usecase';
import { faker } from '@faker-js/faker';
import { CoursePeriodPrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-period-prisma.testing-helper';
import { CoursePrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-prisma.testing-helper';

describe('Update discipline usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: DisciplinePrismaRepository;
  let sut: UpdateDisciplineUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new DisciplinePrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new UpdateDisciplineUsecase.UseCase(repository);
    await prismaService.discipline.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when schedule not found', () => {
    const id = faker.string.uuid();
    expect(() => sut.execute({ id })).rejects.toThrow(
      new DisciplineWithIdNotFoundError(id),
    );
  });

  it('should update a discipline name', async () => {
    const curso = await CoursePrismaTestingHelper.createCourse(prismaService);

    const periodo =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    const discipline = await prismaService.discipline.create({
      data: {
        name: 'Original Discipline Name',
        code: 'DISC123',
        courseId: curso.id,
        coursePeriodId: periodo.id,
      },
    });

    const newName = 'Updated Discipline Name';

    const output = await sut.execute({
      id: discipline.id,
      name: newName,
    });

    expect(output.name).toBe(newName);
  });

  it('should update a discipline code', async () => {
    const curso = await CoursePrismaTestingHelper.createCourse(prismaService);

    const periodo =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    const discipline = await prismaService.discipline.create({
      data: {
        name: 'Original Discipline Name',
        code: 'DISC123',
        courseId: curso.id,
        coursePeriodId: periodo.id,
      },
    });

    const newCode = 'UpdatedCode';

    const output = await sut.execute({
      id: discipline.id,
      code: newCode,
    });

    expect(output.code).toBe(newCode);
  });

  it('should update multiple fields of a discipline', async () => {
    const curso = await CoursePrismaTestingHelper.createCourse(prismaService);

    const periodo =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    const discipline = await prismaService.discipline.create({
      data: {
        name: 'Original Discipline Name',
        code: 'DISC123',
        courseId: curso.id,
        coursePeriodId: periodo.id,
      },
    });

    const newName = 'Updated Discipline Name';
    const newCode = 'UPDATED123';

    const output = await sut.execute({
      id: discipline.id,
      name: newName,
      code: newCode,
    });

    expect(output.name).toBe(newName);
    expect(output.code).toBe(newCode);
  });
});
