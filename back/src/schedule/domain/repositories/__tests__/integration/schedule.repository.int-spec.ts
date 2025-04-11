import {
  resetDatabase,
  setUpPrismaTest,
} from '@/shared/infrastructure/database/prisma/testing/set-up-prisma-test';
import { ScheduleDataBuilder } from '@/schedule/domain/testing/helper/schedule-data-builder';
import { PrismaClient } from '@prisma/client';
import { SchedulePrismaRepository } from '@/schedule/infrastructure/database/prisma/repositories/schedule-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import {
  ScheduleEntity,
  ScheduleProps,
} from '@/schedule/domain/entities/schedule.entity';
import { faker } from '@faker-js/faker';
import { ScheduleWithIdNotFoundError } from '@/schedule/infrastructure/errors/schedule-with-id-not-found-error';
import { ClassroomEntity } from '@/classroom/domain/entities/classroom.entity';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';
import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { CourseDataBuilderAsEntity } from '@/user/domain/testing/helper/course-data-builder';
import { CoursePeriodDataBuilder } from '@/course/domain/testing/helper/course-period-data-builder';

describe('Schedule prisma repository integration tests', () => {
  const prismaService = new PrismaClient();
  let sut: SchedulePrismaRepository;
  let module: TestingModule;

  async function fakeSchedule(): Promise<ScheduleProps> {
    const classroom = ClassroomEntity.fake().aCADClassroom().build();
    const entity = new ScheduleEntity(ScheduleDataBuilder({}));
    const discipline = new DisciplineEntity(DisciplineDataBuilder({}));
    const course = CourseDataBuilderAsEntity();
    const coursePeriodProps = CoursePeriodDataBuilder({});

    const courseData = await prismaService.course.create({
      data: course,
    });

    const coursePeriodData = await prismaService.coursePeriod.create({
      data: {
        name: coursePeriodProps.name,
        course: {
          connect: {
            id: courseData.id,
          },
        },
      },
    });

    const classroomData = await prismaService.classroom.create({
      data: classroom,
    });

    const disciplineData = await prismaService.discipline.create({
      data: {
        name: discipline.name,
        code: discipline.code,
        course: {
          connect: {
            id: course.id,
          },
        },
        coursePeriod: {
          connect: {
            id: coursePeriodData.id,
          },
        },
      },
    });

    return {
      classroomId: classroomData.id,
      disciplineId: disciplineData.id,
      dayPattern: entity.dayPattern,
      timeSlot: entity.timeSlot,
    };
  }

  beforeAll(async () => {
    setUpPrismaTest();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new SchedulePrismaRepository(prismaService as any);
    await resetDatabase(prismaService);
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
    const props = await fakeSchedule();
    const entity = await sut.insert(new ScheduleEntity(props));
    const schedule = await sut.findById(entity.id);

    expect(sut).not.toBeNull();
    expect(schedule.toJSON()).toStrictEqual({
      id: entity.id,
      classroom: {
        id: entity.classroom.id,
        name: entity.classroom.name,
        building: entity.classroom.building,
        createdAt: entity.classroom.createdAt,
      },
      discipline: {
        id: entity.discipline.id,
        name: entity.discipline.name,
        code: entity.discipline.code,
        courseId: entity.discipline.courseId,
        coursePeriodId: entity.discipline.coursePeriodId,
      },
      dayPattern: entity.dayPattern,
      timeSlot: entity.timeSlot,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  });

  it('should return one schedule if theres only one with find all', async () => {
    const props = await fakeSchedule();
    const entity = await sut.insert(new ScheduleEntity(props));

    const schedules = await sut.findAll();

    expect(schedules).toHaveLength(1);
    expect(schedules[0].toJSON()).toStrictEqual({
      id: entity.id,
      classroom: {
        id: entity.classroom.id,
        name: entity.classroom.name,
        building: entity.classroom.building,
        createdAt: entity.classroom.createdAt,
      },
      discipline: {
        id: entity.discipline.id,
        name: entity.discipline.name,
        code: entity.discipline.code,
        courseId: entity.discipline.courseId,
        coursePeriodId: entity.discipline.coursePeriodId,
      },
      dayPattern: entity.dayPattern,
      timeSlot: entity.timeSlot,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  });

  it('should throw error when trying to update non-existent schedule', async () => {
    const nonExistentId = faker.string.uuid();
    const entity = new ScheduleEntity(ScheduleDataBuilder({}), nonExistentId);

    await expect(sut.update(entity)).rejects.toThrow(
      new ScheduleWithIdNotFoundError(nonExistentId),
    );
  });

  it('should update the schedule classroom successfully', async () => {
    const props = await fakeSchedule();
    const entity = await sut.insert(new ScheduleEntity(props));
    const oldClassroomId = props.classroomId;

    expect(entity.classroomId).toBe(oldClassroomId);

    const newClassroomData = await prismaService.classroom.create({
      data: ClassroomEntity.fake().aIcexClassroom().build(),
    });

    entity.classroomId = newClassroomData.id;

    await sut.update(entity);

    expect(entity.classroomId).not.toBe(oldClassroomId);
    expect(entity.classroomId).toBe(newClassroomData.id);
  });

  it('should throw error when trying to delete non-existent schedule', async () => {
    const nonExistentId = faker.string.uuid();

    await expect(sut.delete(nonExistentId)).rejects.toThrow(
      new ScheduleWithIdNotFoundError(nonExistentId),
    );
  });

  it('should delete a schedule successfully', async () => {
    const props = await fakeSchedule();
    const entity = await sut.insert(new ScheduleEntity(props));

    await sut.delete(entity.id);

    const scheduleCount = await prismaService.schedule.count({
      where: { id: entity.id },
    });

    expect(scheduleCount).toBe(0);
  });
});
