import { type Classroom } from './classroom';
import { type MetaData } from './common';
import { type Discipline } from './discipline';

export enum TimeSlotEnum {
  MORNING_1 = 'MORNING_1',
  MORNING_2 = 'MORNING_2',
  MORNING_3 = 'MORNING_3',
  AFTERNOON_1 = 'AFTERNOON_1',
  AFTERNOON_2 = 'AFTERNOON_2',
  EVENING_1 = 'EVENING_1',
  EVENING_2 = 'EVENING_2',
  EVENING_3 = 'EVENING_3',
}

export enum DayPatternEnum {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  MONDAY_WEDNESDAY = 'MONDAY_WEDNESDAY',
  TUESDAY_THURSDAY = 'TUESDAY_THURSDAY',
}

export interface Schedule {
  discipline: Discipline;
  classroom: Classroom;
  timeSlot: TimeSlotEnum;
  dayPattern: DayPatternEnum;
}

export interface ScheduleData {
  data: Schedule[];
  meta: MetaData;
}
