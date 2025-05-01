import { type QTableColumn } from 'quasar';
import {
  type Schedule,
  type ScheduleData,
  type ScheduleRows,
} from 'src/types/schedule';
export enum TimeSlotEnum {
  MORNING_1 = 'MORNING_1',
  MORNING_2 = 'MORNING_2',
  MORNING_3 = 'MORNING_3',
  AFTERNOON_1 = 'AFTERNOON_1',
  AFTERNOON_2 = 'AFTERNOON_2',
  EVENING_1 = 'EVENING_1',
  EVENING_1_2 = 'EVENING_1_2',
  EVENING_2 = 'EVENING_2',
  EVENING_3 = 'EVENING_3',
}

export enum DayPatternEnum {
  MONDAY = 'MONDAY',
  MONDAY_WEDNESDAY = 'MONDAY_WEDNESDAY',
  MONDAY_WEDNESDAY_FRIDAY = 'MONDAY_WEDNESDAY_FRIDAY',
  TUESDAY = 'TUESDAY',
  TUESDAY_THURSDAY = 'TUESDAY_THURSDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

export const timeSlotMap = {
  [TimeSlotEnum.MORNING_1]: '7:30 - 9:10',
  [TimeSlotEnum.MORNING_2]: '9:25 - 11:05',
  [TimeSlotEnum.MORNING_3]: '11:10 - 12:00',
  [TimeSlotEnum.AFTERNOON_1]: '13:00 - 14:40',
  [TimeSlotEnum.AFTERNOON_2]: '14:55 - 16:35',
  [TimeSlotEnum.EVENING_1]: '17:00 - 18:40',
  [TimeSlotEnum.EVENING_1_2]: '17:00 - 20:40',
  [TimeSlotEnum.EVENING_2]: '19:00 - 20:40',
  [TimeSlotEnum.EVENING_3]: '20:55 - 22:35',
};

export const dayPatternMap = {
  [DayPatternEnum.MONDAY]: 'Seg',
  [DayPatternEnum.TUESDAY]: 'Ter',
  [DayPatternEnum.WEDNESDAY]: 'Qua',
  [DayPatternEnum.THURSDAY]: 'Qui',
  [DayPatternEnum.FRIDAY]: 'Sex',
  [DayPatternEnum.SATURDAY]: 'Sab',
  [DayPatternEnum.MONDAY_WEDNESDAY]: 'Seg-Qua',
  [DayPatternEnum.TUESDAY_THURSDAY]: 'Ter-Qui',
  [DayPatternEnum.MONDAY_WEDNESDAY_FRIDAY]: 'Seg-Qua-Sex',
};

export const dayPatternOptions = Object.values(DayPatternEnum).map((value) => ({
  label: dayPatternMap[value],
  value: value,
}));

export const timeSlotOptions = Object.values(TimeSlotEnum).map((value) => ({
  label: timeSlotMap[value],
  value: value,
}));

export function mapDayPattern(dayPattern: DayPatternEnum): string {
  return dayPatternMap[dayPattern] || '';
}
export function mapTimeSlot(timeSlot: TimeSlotEnum): {
  start: string;
  end: string;
} {
  const timeRange = timeSlotMap[timeSlot];
  if (!timeRange) {
    return { start: '', end: '' };
  }
  const [start, end] = timeRange.split(' - ');
  return { start: start ?? '', end: end ?? '' };
}

function convertTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours ?? 0) * 60 + (minutes ?? 0);
}

export function isCurrentSchedule(schedule: Schedule): 'active' | 'inactive' {
  const now = new Date();
  const currentDay = now
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toUpperCase();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const dayMatches = schedule.dayPattern.includes(currentDay);
  const { start, end } = mapTimeSlot(schedule.timeSlot);
  const startMinutes = convertTimeToMinutes(start);
  const endMinutes = convertTimeToMinutes(end);
  const timeMatches =
    currentMinutes >= startMinutes && currentMinutes <= endMinutes;

  return dayMatches && timeMatches ? 'active' : 'inactive';
}

export function scheduleDataToOutput(schedules: ScheduleData) {
  return schedules.data.map((item: Schedule) => {
    const { start, end } = mapTimeSlot(item.timeSlot);
    return {
      name: item.discipline.name,
      code: item.discipline.code,
      class: item.class,
      start,
      end,
      days: mapDayPattern(item.dayPattern),
      unit: item.classroom.building,
      classroom: item.classroom.name,
      status: isCurrentSchedule(item),
    } as ScheduleRows;
  });
}

export const columns: QTableColumn[] = [
  {
    name: 'discipline',
    required: true,
    label: 'Disciplina',
    align: 'center',
    field: (row: { name: string }) => row.name,
    format: (val: string) => `${val}`,
    classes: 'discipline-column',
  },
  { name: 'code', align: 'center', label: 'Código', field: 'code' },
  { name: 'class', align: 'center', label: 'Turma', field: 'class' },
  { name: 'start', align: 'center', label: 'Início', field: 'start' },
  { name: 'end', align: 'center', label: 'Fim', field: 'end' },
  { name: 'days', align: 'center', label: 'Dias', field: 'days' },
  { name: 'unit', align: 'center', label: 'Unidade', field: 'unit' },
  { name: 'classroom', align: 'center', label: 'Sala', field: 'classroom' },
  { name: 'status', align: 'center', label: 'Status', field: 'status' },
];
