import { describe, it, expect } from 'vitest';
import {
  DayPatternEnum,
  dayPatternMap,
  dayPatternOptions,
  mapDayPattern,
  mapTimeSlot,
  TimeSlotEnum,
  timeSlotMap,
  timeSlotOptions,
} from '../table';

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
    it('should return the correct label for a given dayPattern', () => {
      expect(mapDayPattern(DayPatternEnum.MONDAY)).toBe('Seg');
      expect(mapDayPattern(DayPatternEnum.TUESDAY_THURSDAY)).toBe('Ter-Qui');
      expect(mapDayPattern(DayPatternEnum.MONDAY_WEDNESDAY_FRIDAY)).toBe('Seg-Qua-Sex');
    });
  
    it('should return an empty string for an invalid dayPattern', () => {
      expect(mapDayPattern('INVALID_PATTERN' as DayPatternEnum)).toBe('');
    });
  });

  describe('mapTimeSlot', () => {
    it('should return the correct start and end times for a valid timeSlot', () => {
      expect(mapTimeSlot(TimeSlotEnum.MORNING_1)).toEqual({ start: '7:30', end: '9:10' });
      expect(mapTimeSlot(TimeSlotEnum.AFTERNOON_1)).toEqual({ start: '13:00', end: '14:40' });
      expect(mapTimeSlot(TimeSlotEnum.EVENING_3)).toEqual({ start: '20:55', end: '22:35' });
    });
  
    it('should return empty strings for an invalid timeSlot', () => {
      expect(mapTimeSlot('INVALID_SLOT' as TimeSlotEnum)).toEqual({ start: '', end: '' });
    });
  });
});
