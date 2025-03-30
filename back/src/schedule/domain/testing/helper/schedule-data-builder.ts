import { faker } from '@faker-js/faker';
import { ScheduleProps } from '@/schedule/domain/entities/schedule.entity';
import { DayPatternEnum, TimeSlotEnum } from '../../schedule.constants';

export function ScheduleDataBuilder(props: Partial<ScheduleProps>) {
  return {
    disciplineId: props.disciplineId || faker.string.uuid(),
    classroomId: props.classroomId,
    dayPattern: props.dayPattern || DayPatternEnum.TUESDAY_THURSDAY,
    timeSlot: props.timeSlot || TimeSlotEnum.EVENING_1,
    createdAt: props.createdAt || new Date(),
    updatedAt: props.createdAt || new Date(),
  };
}
