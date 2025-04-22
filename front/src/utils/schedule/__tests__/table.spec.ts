import { describe, it, expect, vi } from 'vitest';
import {
  DayPatternEnum,
  dayPatternMap,
  dayPatternOptions,
  mapDayPattern,
  mapTimeSlot,
  scheduleDataToOutput,
  TimeSlotEnum,
  timeSlotMap,
  timeSlotOptions,
} from '../table';
import type { ScheduleData } from 'src/types/schedule';
import { ClassroomBuildingEnum } from '../../../types/classroom'

describe('Schedule Table Utilities', () => {
  describe('timeSlotMap', () => {
    it('should contain all TimeSlotEnum values', () => {
      const enumValues = Object.values(TimeSlotEnum);
      const mapKeys = Object.keys(timeSlotMap);

      expect(mapKeys.length).toBe(enumValues.length);
      enumValues.forEach((value) => {
        expect(timeSlotMap[value]).toBeDefined();
      });
    });

    it('should have correct time slot labels', () => {
      expect(timeSlotMap[TimeSlotEnum.MORNING_1]).toBe('7:30 - 9:10');
      expect(timeSlotMap[TimeSlotEnum.MORNING_2]).toBe('9:25 - 11:05');
      expect(timeSlotMap[TimeSlotEnum.EVENING_3]).toBe('20:55 - 22:35');
      expect(timeSlotMap[TimeSlotEnum.AFTERNOON_1]).toBe('13:00 - 14:40');
      expect(timeSlotMap[TimeSlotEnum.AFTERNOON_2]).toBe('14:55 - 16:35');
      expect(timeSlotMap[TimeSlotEnum.EVENING_1]).toBe('17:00 - 18:40');
      expect(timeSlotMap[TimeSlotEnum.EVENING_1_2]).toBe('17:00 - 20:40');
      expect(timeSlotMap[TimeSlotEnum.EVENING_2]).toBe('19:00 - 20:40');
      expect(timeSlotMap[TimeSlotEnum.EVENING_3]).toBe('20:55 - 22:35');
    });
  });

  describe('dayPatternMap', () => {
    it('should contain all DayPatternEnum values', () => {
      const enumValues = Object.values(DayPatternEnum);
      const mapKeys = Object.keys(dayPatternMap);

      expect(mapKeys.length).toBe(enumValues.length);
      enumValues.forEach((value) => {
        expect(dayPatternMap[value]).toBeDefined();
      });
    });

    it('should have correct day pattern labels', () => {
      expect(dayPatternMap[DayPatternEnum.MONDAY]).toBe('Seg');
      expect(dayPatternMap[DayPatternEnum.TUESDAY]).toBe('Ter');
      expect(dayPatternMap[DayPatternEnum.WEDNESDAY]).toBe('Qua');
      expect(dayPatternMap[DayPatternEnum.THURSDAY]).toBe('Qui');
      expect(dayPatternMap[DayPatternEnum.FRIDAY]).toBe('Sex');
      expect(dayPatternMap[DayPatternEnum.SATURDAY]).toBe('Sab');
      expect(dayPatternMap[DayPatternEnum.MONDAY_WEDNESDAY]).toBe('Seg-Qua');
      expect(dayPatternMap[DayPatternEnum.TUESDAY_THURSDAY]).toBe('Ter-Qui');
      expect(dayPatternMap[DayPatternEnum.MONDAY_WEDNESDAY_FRIDAY]).toBe(
        'Seg-Qua-Sex',
      );
    });
  });

  describe('consistency between maps and options', () => {
    it('should have matching labels in map and options for time slots', () => {
      timeSlotOptions.forEach((option) => {
        expect(option.label).toBe(timeSlotMap[option.value]);
      });
    });

    it('should have matching labels in map and options for day patterns', () => {
      dayPatternOptions.forEach((option) => {
        expect(option.label).toBe(dayPatternMap[option.value]);
      });
    });
  });


  describe('mapDayPattern', () => {
    it('should return the correct label for all valid day patterns', () => {
      expect(mapDayPattern(DayPatternEnum.MONDAY)).toBe('Seg');
      expect(mapDayPattern(DayPatternEnum.TUESDAY)).toBe('Ter');
      expect(mapDayPattern(DayPatternEnum.WEDNESDAY)).toBe('Qua');
      expect(mapDayPattern(DayPatternEnum.THURSDAY)).toBe('Qui');
      expect(mapDayPattern(DayPatternEnum.FRIDAY)).toBe('Sex');
      expect(mapDayPattern(DayPatternEnum.SATURDAY)).toBe('Sab');
      expect(mapDayPattern(DayPatternEnum.MONDAY_WEDNESDAY)).toBe('Seg-Qua');
      expect(mapDayPattern(DayPatternEnum.TUESDAY_THURSDAY)).toBe('Ter-Qui');
      expect(mapDayPattern(DayPatternEnum.MONDAY_WEDNESDAY_FRIDAY)).toBe('Seg-Qua-Sex');
    });
  
    it('should return an empty string for an invalid day pattern', () => {
      expect(mapDayPattern('INVALID_PATTERN' as DayPatternEnum)).toBe('');
    });
  });

  describe('mapTimeSlot', () => {
    it('should return the correct start and end times for all valid time slots', () => {
      expect(mapTimeSlot(TimeSlotEnum.MORNING_1)).toEqual({ start: '7:30', end: '9:10' });
      expect(mapTimeSlot(TimeSlotEnum.MORNING_2)).toEqual({ start: '9:25', end: '11:05' });
      expect(mapTimeSlot(TimeSlotEnum.MORNING_3)).toEqual({ start: '11:10', end: '12:00' });
      expect(mapTimeSlot(TimeSlotEnum.AFTERNOON_1)).toEqual({ start: '13:00', end: '14:40' });
      expect(mapTimeSlot(TimeSlotEnum.AFTERNOON_2)).toEqual({ start: '14:55', end: '16:35' });
      expect(mapTimeSlot(TimeSlotEnum.EVENING_1)).toEqual({ start: '17:00', end: '18:40' });
      expect(mapTimeSlot(TimeSlotEnum.EVENING_1_2)).toEqual({ start: '17:00', end: '20:40' });
      expect(mapTimeSlot(TimeSlotEnum.EVENING_2)).toEqual({ start: '19:00', end: '20:40' });
      expect(mapTimeSlot(TimeSlotEnum.EVENING_3)).toEqual({ start: '20:55', end: '22:35' });
    });
  
    it('should return empty strings for an invalid time slot', () => {
      expect(mapTimeSlot('INVALID_SLOT' as TimeSlotEnum)).toEqual({ start: '', end: '' });
    });
  });

  describe('scheduleDataToOutput', () => {
    const mockScheduleData: ScheduleData = {
      meta: {
        currentPage: 1,
        perPage: 10,
        lastPage: 1,
        total: 1,
      },
      data: [
        {
          discipline: {
            id: '1',
            name: 'Algoritmos',
            code: 'DCC101',
            courseId: 'c1',
            coursePeriodId: 'p1',
          },
          classroom: {
            id: '101',
            name: 'Sala 101',
            building: ClassroomBuildingEnum.ICEX,
          },
          timeSlot: TimeSlotEnum.MORNING_1,
          dayPattern: DayPatternEnum.MONDAY, 
        },
      ],
    };
  
    beforeAll(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-04-08T08:00:00')); 
    });
  
    afterAll(() => {
      vi.useRealTimers();
    });
  
    it('should map schedule data correctly', () => {
      const result = scheduleDataToOutput(mockScheduleData);
  
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        name: 'Algoritmos',
        code: 'DCC101',
        start: '7:30',
        end: '9:10',
        days: 'Seg',
        unit: 'ICEX',
        classroom: 'Sala 101',
        direction: 'Ver Mapa',
        status: false, 
      });
    });
  });
});
