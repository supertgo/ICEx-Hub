import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { Schedule } from '@prisma/client';
import { ScheduleModelMapper } from '@/schedule/infrastructure/database/prisma/models/schedule-model.mapper';
import { ValidationErrors } from '@/shared/domain/errors/validation-errors';
import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';
import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';

describe('Schedule model mapper integration tests', () => {
  let prismaService: PrismaService;
  let props: any;

  beforeAll(async () => {
    setUpPrismaTest();
    
    prismaService = new PrismaService();
    props = ScheduleDataBuilder({});
    await prismaService.$connect();
  });

  beforeEach(() => {
    prismaService.schedule.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throw error when schedule model is invalid', () => {
    const model: Schedule = Object.assign({}, props, { name: null });

    expect(() => ScheduleModelMapper.toEntity(model)).toThrowError(
      new ValidationErrors('Could not load schedule having id undefined'),
    );
  });

  it('should map schedule model to entity', async () => {
    const model: Schedule = await prismaService.schedule.create({
      data: props,
    });

    const sut = ScheduleModelMapper.toEntity(model);

    expect(sut).toBeInstanceOf(ScheduleEntity);

  });
});
