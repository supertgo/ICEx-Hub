import { PrismaClient } from '@prisma/client';
import { SchedulePrismaRepository } from '@/schedule/infrastructure/database/prisma/repositories/schedule-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { ListSchedulesUsecase } from '@/schedule/application/usecases/list-schedule.usecase';
import { SchedulePrismaTestingHelper } from '@/schedule/infrastructure/database/prisma/testing/schedule-prismaa.testing-helper';

describe('List schedules usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: SchedulePrismaRepository;
  let sut: ListSchedulesUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new SchedulePrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new ListSchedulesUsecase.UseCase(repository);
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should retrieve all schedules from database and paginate', async () => {
    await SchedulePrismaTestingHelper.createCompleteSchedules(
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

  it('should filter by the timeSlot', async () => {
    const schedules = await SchedulePrismaTestingHelper.createCompleteSchedules(
      prismaService,
      11,
    );

    const output = await sut.execute({
      filter: {
        timeSlots: [schedules[0].timeSlot],
      },
    });

    expect(output.items.length).toBeGreaterThanOrEqual(1);

    output.items.forEach((item) => {
      expect(item.timeSlot).toEqual(schedules[0].timeSlot);
    });
  });

  it('should filter by the courseId', async () => {
    const schedules = await SchedulePrismaTestingHelper.createCompleteSchedules(
      prismaService,
      11,
    );

    const output = await sut.execute({
      filter: {
        courseId: schedules[0].discipline.courseId,
      },
    });

    expect(output.items.length).toBeGreaterThanOrEqual(1);

    output.items.forEach((item) => {
      expect(item.discipline.courseId).toEqual(
        schedules[0].discipline.courseId,
      );
    });
  });

  it('should filter by the dayPatterns', async () => {
    const schedules = await SchedulePrismaTestingHelper.createCompleteSchedules(
      prismaService,
      11,
    );

    const output = await sut.execute({
      filter: {
        dayPatterns: [schedules[0].dayPattern],
      },
    });

    expect(output.items.length).toBeGreaterThanOrEqual(1);

    output.items.forEach((item) => {
      expect(item.dayPattern).toEqual(schedules[0].dayPattern);
    });
  });

  it('should filter by the periodId', async () => {
    const schedules = await SchedulePrismaTestingHelper.createCompleteSchedules(
      prismaService,
      11,
    );

    const output = await sut.execute({
      filter: {
        coursePeriodId: schedules[0].discipline.coursePeriodId,
      },
    });

    expect(output.items.length).toBeGreaterThanOrEqual(1);

    output.items.forEach((item) => {
      expect(item.discipline.coursePeriodId).toEqual(
        schedules[0].discipline.coursePeriodId,
      );
    });
  });

  it('should filter discipline name', async () => {
    const schedules = await SchedulePrismaTestingHelper.createCompleteSchedules(
      prismaService,
      11,
    );

    const output = await sut.execute({
      filter: {
        name: schedules[0].discipline.name,
      },
    });

    expect(output.items.length).toBeGreaterThanOrEqual(1);
  });

  it('should filter discipline code', async () => {
    const schedules = await SchedulePrismaTestingHelper.createCompleteSchedules(
      prismaService,
      11,
    );

    const output = await sut.execute({
      filter: {
        name: schedules[0].discipline.code,
      },
    });

    expect(output.items.length).toBeGreaterThanOrEqual(1);
  });

  it('should filter by class', async () => {
    const schedules = await SchedulePrismaTestingHelper.createCompleteSchedules(
      prismaService,
      11,
    );

    const output = await sut.execute({
      filter: {
        class: schedules[0].class,
      },
    });

    expect(output.items.length).toBeGreaterThanOrEqual(1);
    output.items.forEach((item) => {
      expect(item.class).toEqual(schedules[0].class);
    });
  });
});
