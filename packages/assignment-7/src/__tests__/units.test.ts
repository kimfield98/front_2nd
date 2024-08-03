import { describe, test, expect } from 'vitest';
import {
  formatMonth,
  formatWeek,
  getDaysInMonth,
  getWeekDates,
  navigate,
} from '../utils';

const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
  return date >= startDate && date <= endDate;
};

describe('단위 테스트: 날짜 및 시간 관리', () => {
  describe('getDaysInMonth 함수', () => {
    test('주어진 월의 일 수를 정확히 반환한다', () => {
      expect(getDaysInMonth(2024, 0)).toBe(31); // 2024년 1월
      expect(getDaysInMonth(2024, 1)).toBe(29); // 2024년 2월 (윤년)
      expect(getDaysInMonth(2024, 3)).toBe(30); // 2024년 4월
    });
  });

  describe('getWeekDates 함수', () => {
    test('주어진 날짜가 속한 주의 모든 날짜를 반환한다', () => {
      const date = new Date('2024-08-20'); // 화요일
      const weekDates = getWeekDates(date);
      expect(weekDates[0].toISOString().split('T')[0]).toBe('2024-08-19'); // 월요일
      expect(weekDates[6].toISOString().split('T')[0]).toBe('2024-08-25'); // 일요일
    });

    test('연도를 넘어가는 주의 날짜를 정확히 처리한다', () => {
      const date = new Date('2023-12-30'); // 토요일
      const weekDates = getWeekDates(date);
      expect(weekDates[0].toISOString().split('T')[0]).toBe('2023-12-25'); // 월요일
      expect(weekDates[6].toISOString().split('T')[0]).toBe('2023-12-31'); // 일요일
    });
  });

  describe('formatWeek 함수', () => {
    test('주어진 날짜의 주 정보를 올바른 형식으로 반환한다', () => {
      const date = new Date('2024-08-20');
      expect(formatWeek(date)).toBe('2024년 8월 3주');
    });
  });

  describe('formatMonth 함수', () => {
    test('주어진 날짜의 월 정보를 올바른 형식으로 반환한다', () => {
      const date = new Date('2024-08-20');
      expect(formatMonth(date)).toBe('2024년 8월');
    });
  });

  describe('isDateInRange 함수', () => {
    test('주어진 날짜가 특정 범위 내에 있는지 정확히 판단한다', () => {
      const date = new Date('2024-08-20');
      const startDate = new Date('2024-08-01');
      const endDate = new Date('2024-08-31');
      expect(isDateInRange(date, startDate, endDate)).toBe(true);

      const outOfRangeDate = new Date('2024-09-01');
      expect(isDateInRange(outOfRangeDate, startDate, endDate)).toBe(false);
    });
  });

  describe('navigate 함수', () => {
    test('주를 기준으로 이전 또는 다음 날짜로 이동한다', () => {
      const currentDate = new Date('2024-08-20');
      const prevWeek = navigate(currentDate, 'prev', 'week');
      const nextWeek = navigate(currentDate, 'next', 'week');

      expect(prevWeek.toISOString().split('T')[0]).toBe('2024-08-13'); // 1주 전
      expect(nextWeek.toISOString().split('T')[0]).toBe('2024-08-27'); // 1주 후
    });

    test('월을 기준으로 이전 또는 다음 날짜로 이동한다', () => {
      const currentDate = new Date('2024-08-20');
      const prevMonth = navigate(currentDate, 'prev', 'month');
      const nextMonth = navigate(currentDate, 'next', 'month');

      expect(prevMonth.toISOString().split('T')[0]).toBe('2024-07-20'); // 1달 전
      expect(nextMonth.toISOString().split('T')[0]).toBe('2024-09-20'); // 1달 후
    });
  });
});
