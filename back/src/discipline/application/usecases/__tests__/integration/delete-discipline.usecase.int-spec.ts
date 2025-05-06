import { PrismaClient } from '@prisma/client';
import { DisciplinePrismaRepository } from '@/discipline/infrastructure/database/prisma/repositories/discipline-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DeleteDisciplineUsecase } from '@/discipline/application/usecases/delete-discipline.usecase';
import { CoursePeriodPrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-period-prisma.testing-helper';
import { CoursePrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-prisma.testing-helper';
import { faker } from '@faker-js/faker';
import { DisciplineWithIdNotFoundError } from '@/discipline/infrastructure/errors/discipline-with-id-not-found-error';
import { sanitizeString } from '@/shared/domain/helper/sanitize-string.helper';

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
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when discipline not found', () => {
    const id = faker.string.uuid();
    expect(() => sut.execute({ id })).rejects.toThrow(
      new DisciplineWithIdNotFoundError(id),
    );
  });

  it('should delete a discipline', async () => {
    const course = await CoursePrismaTestingHelper.createCourse(prismaService);
    const period =
      await CoursePeriodPrismaTestingHelper.createCoursePeriod(prismaService);

    const discipline = await prismaService.discipline.create({
      data: {
        name: 'Original Discipline Name',
        sanitized_name: sanitizeString('Original Discipline Name'),
        code: 'DISC123',
        courseId: course.id,
        coursePeriodId: period.id,
      },
    });

    await sut.execute({ id: discipline.id });

    const disciplineCount = await prismaService.discipline.count({
      where: {
        id: discipline.id,
      },
    });

    expect(disciplineCount).toBe(0);
  });
});
