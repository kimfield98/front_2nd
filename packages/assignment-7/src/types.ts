import { useToast } from "@chakra-ui/react";

export type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

interface RepeatInfo {
  type: RepeatType;
  interval: number;
  endDate?: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  category: string;
  repeat: RepeatInfo;
  notificationTime: number; // 분 단위로 저장
}

export interface UseEventsReturn {
  fetchHolidays: (
    year: number,
    month: number
  ) => Promise<{ [key: string]: string }>;
  fetchEvents: () => Promise<void>;
  addOrUpdateEvent: () => Promise<void>;
  saveEvent: (eventData: Event) => Promise<void>;
  editEvent: (event: Event) => void;
  deleteEvent: (id: number) => Promise<void>;
  validateTime: (start: string, end: string) => void;
  checkUpcomingEvents: () => Promise<void>;
  handleStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getDaysInMonth: (year: number, month: number) => number;
  getWeekDates: (date: Date) => Date[];
  navigate: (direction: 'prev' | 'next') => void;
  searchEvents: (term: string) => Event[];
  formatWeek: (date: Date) => string;
  formatMonth: (date: Date) => string;
  filteredEvents: Event[];
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  view: 'week' | 'month';
  setView: React.Dispatch<React.SetStateAction<'week' | 'month'>>;
  editingEvent: Event | null;
  setEditingEvent: React.Dispatch<React.SetStateAction<Event | null>>;
  isRepeating: boolean;
  setIsRepeating: React.Dispatch<React.SetStateAction<boolean>>;
  repeatType: RepeatType;
  setRepeatType: React.Dispatch<React.SetStateAction<RepeatType>>;
  repeatInterval: number;
  setRepeatInterval: React.Dispatch<React.SetStateAction<number>>;
  repeatEndDate: string;
  setRepeatEndDate: React.Dispatch<React.SetStateAction<string>>;
  notificationTime: number;
  setNotificationTime: React.Dispatch<React.SetStateAction<number>>;
  notifications: { id: number; message: string }[];
  setNotifications: React.Dispatch<
    React.SetStateAction<{ id: number; message: string }[]>
  >;
  notifiedEvents: number[];
  setNotifiedEvents: React.Dispatch<React.SetStateAction<number[]>>;
  isOverlapDialogOpen: boolean;
  setIsOverlapDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  overlappingEvents: Event[];
  setOverlappingEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  startTimeError: string | null;
  setStartTimeError: React.Dispatch<React.SetStateAction<string | null>>;
  endTimeError: string | null;
  setEndTimeError: React.Dispatch<React.SetStateAction<string | null>>;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  holidays: { [key: string]: string };
  setHolidays: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  cancelRef: React.RefObject<HTMLButtonElement>;
  toast: ReturnType<typeof useToast>;
}
