import { PrismaClient } from '@prisma/client';
import { DisciplinePrismaRepository } from '@/discipline/infrastructure/database/prisma/repositories/discipline-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { fakeDisciplineProps } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';
import { UpdateDisciplineUsecase } from '@/discipline/application/usecases/update-discipline.usecase';
import { faker } from '@faker-js/faker';

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

  it('should update a discipline', async () => {
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

    const updatedName = 'Updated Discipline Name';
    const updatedCode = 'UPDATED123';

    const result = await sut.execute({
      id: createdDiscipline.id,
      name: updatedName,
      code: updatedCode,
    });

    const updatedDiscipline = await prismaService.discipline.findUnique({
      where: { id: createdDiscipline.id },
    });

    expect(updatedDiscipline).toBeDefined();
    expect(updatedDiscipline?.name).toEqual(updatedName);
    expect(updatedDiscipline?.code).toEqual(updatedCode);
    expect(result.name).toEqual(updatedName);
    expect(result.code).toEqual(updatedCode);
  });
});
