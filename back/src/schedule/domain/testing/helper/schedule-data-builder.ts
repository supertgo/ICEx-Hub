import { faker } from '@faker-js/faker';
import { ScheduleProps } from '@/schedule/domain/entities/schedule.entity';
import { DayPatternEnum, TimeSlotEnum } from '../../schedule.constants';
import { ClassroomFakeBuilder } from '@/classroom/domain/fake-builder/classroom-fake.builder';

export function ScheduleDataBuilder(props: Partial<ScheduleProps>) {
  return {
    disciplineId: props.disciplineId || faker.string.uuid(),
    classroomId: props.classroomId || faker.string.uuid(),
    classroom: props.classroom || ClassroomFakeBuilder.aCADClassroom().build(),
    discipline: {
      id: faker.string.uuid(),
      name: faker.string.alpha(),
      code: faker.string.alpha(),
      courseId: faker.string.uuid(),
      coursePeriodId: faker.string.uuid(),
      createdAt: props.createdAt || new Date(),
      updatedAt: props.createdAt || new Date(),
    },

    dayPattern: props.dayPattern || DayPatternEnum.TUESDAY_THURSDAY,
    timeSlot: props.timeSlot || TimeSlotEnum.EVENING_1,
    createdAt: props.createdAt || new Date(),
    updatedAt: props.createdAt || new Date(),
  };
}
