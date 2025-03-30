import { PrismaClient } from '@prisma/client';
import { SchedulePrismaRepository } from '@/schedule/infrastructure/database/prisma/repositories/schedule-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';
import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ListSchedulesUsecase } from '@/schedule/application/usecases/list-schedule.usecase';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

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
    await prismaService.schedule.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });
});
