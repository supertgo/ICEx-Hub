import { type Classroom } from './classroom';
import { type MetaData } from './common';
import { type Discipline } from './discipline';

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

export interface ScheduleRows {
  name: string;
  code: string;
  start: string;
  end: string;
  days: string;
  unit: string;
  classroom: string;
  direction: string;
  status: 'active' | 'inactive';
}

export interface ListScheduleParams {
  name?: string | null;
  timeSlots?: string[] | null;
  dayPatterns?: string[] | null;
  courseId?: string | undefined;
  coursePeriodId?: string | undefined;
}
