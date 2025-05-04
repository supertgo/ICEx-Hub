import { fakeScheduleProps } from '@/schedule/domain/testing/helper/schedule-data-builder';
import { ClassroomBulding, PrismaClient, Schedule } from '@prisma/client';
import { CoursePrismaTestingHelper } from '@/course/infrastructure/database/prisma/testing/course-prisma.testing-helper';

type ScheduleIncludes = {
  discipline: {
    id: string;
    name: string;
    code: string;
    courseId: string;
    coursePeriodId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  classroom: {
    id: string;
    name: string;
    building: ClassroomBulding;
    createdAt: Date;
    updatedAt: Date;
  };
} & Schedule;

export class SchedulePrismaTestingHelper {
  static async createCompleteSchedules(
    prisma: PrismaClient,
    count: number = 1,
  ) {
    const schedules: ScheduleIncludes[] = [];

    for (let i = 0; i < count; i++) {
      const { course, coursePeriodProps, discipline, classroom, ...entity } =
        fakeScheduleProps();

      await CoursePrismaTestingHelper.createSanitizedCourse(prisma, course);

      const coursePeriodData = await prisma.coursePeriod.create({
        data: {
          name: coursePeriodProps.name,
          course: {
            connect: {
              id: course.id,
            },
          },
        },
      });

      await prisma.classroom.create({
        data: classroom,
      });

      await prisma.discipline.create({
        data: {
          id: discipline.id,
          name: discipline.name,
          code: discipline.code,
          coursePeriodId: coursePeriodData.id,
          courseId: course.id,
        },
      });

      const schedule = await prisma.schedule.create({
        data: {
          classroomId: classroom.id,
          disciplineId: discipline.id,
          timeSlot: entity.timeSlot,
          dayPattern: entity.dayPattern,
          class: entity.class,
        },
        include: {
          classroom: true,
          discipline: true,
        },
      });

      schedules.push(schedule);
    }

    return schedules;
  }
}
