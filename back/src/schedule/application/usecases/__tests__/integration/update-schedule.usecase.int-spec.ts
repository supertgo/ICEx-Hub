import { PrismaClient } from '@prisma/client';
import { SchedulePrismaRepository } from '@/schedule/infrastructure/database/prisma/repositories/schedule-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';
import { ScheduleWithIdNotFoundError } from '@/schedule/infrastructure/errors/schedule-with-id-not-found-error';
import { UpdateScheduleUsecase } from '@/schedule/application/usecases/update-schedule.usecase';

describe('Update schedule usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: SchedulePrismaRepository;
  let sut: UpdateScheduleUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new SchedulePrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new UpdateScheduleUsecase.UseCase(repository);
    await prismaService.schedule.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it.todo('should throw error when schedule not found', () => {});

  it.todo('should update a schedule', async () => { });
});
