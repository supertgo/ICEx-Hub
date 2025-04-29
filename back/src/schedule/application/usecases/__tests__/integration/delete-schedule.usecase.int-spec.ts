import { PrismaClient } from '@prisma/client';
import { SchedulePrismaRepository } from '@/schedule/infrastructure/database/prisma/repositories/schedule-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DeleteScheduleUsecase } from '@/schedule/application/usecases/delete-schedule.usecase';
import { faker } from '@faker-js/faker';
import { ScheduleWithIdNotFoundError } from '@/schedule/infrastructure/errors/schedule-with-id-not-found-error';
import { fakeScheduleProps } from '@/schedule/domain/testing/helper/schedule-data-builder';

describe('Delete Schedule usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: SchedulePrismaRepository;
  let sut: DeleteScheduleUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new SchedulePrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new DeleteScheduleUsecase.UseCase(repository);
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when schedule not found', () => {
    const id = faker.string.uuid();

    expect(() => sut.execute({ id })).rejects.toThrow(
      new ScheduleWithIdNotFoundError(id),
    );
  });

  it('should delete a schedule', async () => {
    const { course, coursePeriodProps, discipline, classroom, ...entity } =
      fakeScheduleProps();

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

    await prismaService.classroom.create({
      data: classroom,
    });

    await prismaService.discipline.create({
      data: {
        id: discipline.id,
        name: discipline.name,
        code: discipline.code,
        coursePeriodId: coursePeriodData.id,
        courseId: course.id,
      },
    });

    const schedule = await prismaService.schedule.create({
      data: {
        classroomId: classroom.id,
        disciplineId: discipline.id,
        timeSlot: entity.timeSlot,
        dayPattern: entity.dayPattern,
        class: entity.class,
      },
    });

    await sut.execute({ id: schedule.id });

    const scheduleCount = await prismaService.schedule.count({
      where: {
        id: schedule.id,
      },
    });

    expect(scheduleCount).toBe(0);
  });
});
