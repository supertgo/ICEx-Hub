import { PrismaClient } from '@prisma/client';
import { SchedulePrismaRepository } from '@/schedule/infrastructure/database/prisma/repositories/schedule-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { DeleteScheduleUsecase } from '@/schedule/application/usecases/delete-schedule.usecase';

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
    await prismaService.schedule.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when schedule not found', () => { });

  it('should delete a schedule', async () => {
  });
});
