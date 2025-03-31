import { PrismaClient } from '@prisma/client';
import { SchedulePrismaRepository } from '@/schedule/infrastructure/database/prisma/repositories/schedule-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { GetScheduleUsecase } from '@/schedule/application/usecases/get-schedule.usecase';
import { faker } from '@faker-js/faker';

describe('Get schedule usecase integration tests', () => {
  const prismaService = new PrismaClient();
  let repository: SchedulePrismaRepository;
  let sut: GetScheduleUsecase.UseCase;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();

    repository = new SchedulePrismaRepository(prismaService as any);
  });

  beforeEach(async () => {
    sut = new GetScheduleUsecase.UseCase(repository);
    await prismaService.schedule.deleteMany();
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

  it('should retrieve a schedule', async () => {
    const schedule = await prismaService.schedule.create({ data: ScheduleDataBuilder({}) });

    const output = await sut.execute({ id: schedule.id });

    expect(output).toBeDefined();
    expect(output).toMatchObject(schedule);
  });
});
