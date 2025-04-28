import { PrismaClient } from '@prisma/client';
import { DisciplinePrismaRepository } from '@/discipline/infrastructure/database/prisma/repositories/discipline-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DeleteDisciplineUsecase } from '@/discipline/application/usecases/delete-discipline.usecase';
import { fakeDisciplineProps } from '@/discipline/domain/testing/helper/discipline-data-builder';

describe('Delete Discipline usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: DisciplinePrismaRepository;
  let sut: DeleteDisciplineUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new DisciplinePrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new DeleteDisciplineUsecase.UseCase(repository);
    await prismaService.schedule.deleteMany();
    await prismaService.discipline.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should delete a discipline', async () => {
    const { course, coursePeriodProps, ...discipline } = fakeDisciplineProps();

    await prismaService.course.create({
      data: course,
    });

    const coursePeriodData = await prismaService.coursePeriod.create({
      data: {
        name: coursePeriodProps.name,
        course: {
          connect: {
            id: course.id,
          },
        },
      },
    });

    const createdDiscipline = await prismaService.discipline.create({
      data: {
        id: discipline.id,
        name: discipline.name,
        code: discipline.code,
        coursePeriodId: coursePeriodData.id,
        courseId: course.id,
      },
    });

    await sut.execute({ id: createdDiscipline.id });

    const disciplineCount = await prismaService.discipline.count({
      where: {
        id: createdDiscipline.id,
      },
    });

    expect(disciplineCount).toBe(0);
  });
});
