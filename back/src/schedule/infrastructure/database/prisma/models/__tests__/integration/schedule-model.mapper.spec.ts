import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { Schedule } from '@prisma/client';
import { ScheduleModelMapper } from '@/schedule/infrastructure/database/prisma/models/schedule-model.mapper';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';
import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';
import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { SchedulePrismaTestingHelper } from '../../../testing/schedule-prismaa.testing-helper';
import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';

describe('Schedule model mapper integration tests', () => {
  let prismaService: PrismaService;
  let props: any;

  beforeAll(async () => {
    setUpPrismaTest();

    prismaService = new PrismaService();
    props = ScheduleDataBuilder({});
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await resetDatabase(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throw error when schedule model is invalid', () => {
    const model: Schedule = Object.assign({}, props, { timeSlot: null });

    expect(() => ScheduleModelMapper.toEntity(model)).toThrow(
      new ValidationErrors('Could not load schedule having id undefined'),
    );
  });

  it('should map schedule model to entity', async () => {
    const [model] =
      await SchedulePrismaTestingHelper.createCompleteSchedules(prismaService);

    const sut = ScheduleModelMapper.toEntity(model);

    expect(sut).toBeInstanceOf(ScheduleEntity);
  });
});
