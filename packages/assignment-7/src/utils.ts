import { Event, ResetFormSetters, ViewType } from './types';

export const resetFormState = (setters: ResetFormSetters) => {
  const [
    setTitle,
    setDate,
    setStartTime,
    setEndTime,
    setDescription,
    setLocation,
    setCategory,
    setEditingEvent,
    setIsRepeating,
    setRepeatType,
    setRepeatInterval,
    setRepeatEndDate,
  ] = setters;

  setTitle('');
  setDate('');
  setStartTime('');
  setEndTime('');
  setDescription('');
  setLocation('');
  setCategory('');
  setEditingEvent(null);
  setIsRepeating(false);
  setRepeatType('none');
  setRepeatInterval(1);
  setRepeatEndDate('');
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getWeekDates = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(monday);
    nextDate.setDate(monday.getDate() + i);
    weekDates.push(nextDate);
  }
  return weekDates;
};

export const formatWeek = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const weekNumber = Math.ceil(date.getDate() / 7);
  return `${year}년 ${month}월 ${weekNumber}주`;
};

export const formatMonth = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}년 ${month}월`;
};

export const parseDateTime = (date: string, time: string): Date => {
  return new Date(`${date}T${time}`);
};

export const isOverlapping = (event1: Event, event2: Event): boolean => {
  const start1 = parseDateTime(event1.date, event1.startTime);
  const end1 = parseDateTime(event1.date, event1.endTime);
  const start2 = parseDateTime(event2.date, event2.startTime);
  const end2 = parseDateTime(event2.date, event2.endTime);

  return start1 < end2 && start2 < end1;
};

export const findOverlappingEvents = (
  newEvent: Event,
  events: Event[]
): Event[] => {
  return events.filter(
    (event) => event.id !== newEvent.id && isOverlapping(event, newEvent)
  );
};

export const navigate = (
  currentDate: Date,
  direction: 'prev' | 'next',
  view: ViewType
) => {
  const newDate = new Date(currentDate);
  if (view === 'week') {
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
  } else if (view === 'month') {
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
  }
  return newDate;
};
