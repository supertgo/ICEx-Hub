import { setUpPrismaTest } from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';
import { PrismaClient } from '@prisma/client';
import { SchedulePrismaRepository } from '@/schedule/infrastructure/database/prisma/repositories/schedule-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { ScheduleEntity } from '@/schedule/domain/entities/schedule.entity';
import { faker } from '@faker-js/faker';
import { ScheduleWithIdNotFoundError } from '@/schedule/infrastructure/errors/schedule-with-id-not-found-error';

describe('Schedule prisma repository integration tests', () => {
  const prismaService = new PrismaClient();
  let sut: SchedulePrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new SchedulePrismaRepository(prismaService as any);
    await prismaService.schedule.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await module.close();
  });

  it('should throw error when entity does not exist', () => {
    expect(() => sut.findById('1')).rejects.toThrow(
      new ScheduleWithIdNotFoundError('1'),
    );
  });

  it('should find schedule by id', async () => {
    const entity = new ScheduleEntity(ScheduleDataBuilder({}));

    const createdSchedule = await prismaService.schedule.create({
      data: {
        classroomId: entity.classroomId,
        disciplineId: entity.disciplineId,
        dayPattern: entity.dayPattern,
        timeSlot: entity.timeSlot,
      },
    });

    const schedule = await sut.findById(createdSchedule.id);

    expect(sut).not.toBeNull();
    expect(schedule.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should insert a new schedule', async () => {
    const entity = new ScheduleEntity(ScheduleDataBuilder({}));
    await sut.insert(entity);
  });

  it('should return one schedule if theres only one with find all', async () => {
    const entity = new ScheduleEntity(ScheduleDataBuilder({}));
    await sut.insert(entity);

    const schedules = await sut.findAll();

    expect(schedules).toHaveLength(1);
    expect(schedules[0].toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should throw error when trying to update non-existent schedule', async () => {
    const nonExistentId = faker.string.uuid();
    const entity = new ScheduleEntity(ScheduleDataBuilder({}), nonExistentId);

    await expect(sut.update(entity)).rejects.toThrow(
      new ScheduleWithIdNotFoundError(nonExistentId),
    );
  });

  it('should update a schedule successfully', async () => {});

  it('should throw error when trying to delete non-existent schedule', async () => {
    const nonExistentId = faker.string.uuid();

    await expect(sut.delete(nonExistentId)).rejects.toThrow(
      new ScheduleWithIdNotFoundError(nonExistentId),
    );
  });

  it('should delete a schedule successfully', async () => {
    const entity = new ScheduleEntity(ScheduleDataBuilder({}));
    await sut.insert(entity);

    await sut.delete(entity.id);

    const scheduleCount = await prismaService.schedule.count({
      where: { id: entity.id },
    });

    expect(scheduleCount).toBe(0);
  });

  describe('search tests', () => {
    it.todo('should return with default values');

    it.todo('should paginate schedules');
  });
});
