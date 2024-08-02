import { useToast } from '@chakra-ui/react';
import { Dispatch, RefObject, SetStateAction } from 'react';

export type ResetFormSetters = [
  Dispatch<SetStateAction<string>>,
  Dispatch<SetStateAction<string>>,
  Dispatch<SetStateAction<string>>,
  Dispatch<SetStateAction<string>>,
  Dispatch<SetStateAction<string>>,
  Dispatch<SetStateAction<string>>,
  Dispatch<SetStateAction<string>>,
  Dispatch<SetStateAction<Event | null>>,
  Dispatch<SetStateAction<boolean>>,
  Dispatch<SetStateAction<RepeatType>>,
  Dispatch<SetStateAction<number>>,
  Dispatch<SetStateAction<string>>
];

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

export type UseEventsReturn = {
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
  navigate: (direction: 'prev' | 'next') => void;
  searchEvents: (term: string) => Event[];
  filteredEvents: Event[];
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  startTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;
  endTime: string;
  setEndTime: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  view: 'week' | 'month';
  setView: Dispatch<SetStateAction<'week' | 'month'>>;
  notifications: { id: number; message: string }[];
  setNotifications: Dispatch<SetStateAction<{ id: number; message: string }[]>>;
  notifiedEvents: number[];
  setNotifiedEvents: Dispatch<SetStateAction<number[]>>;
  isOverlapDialogOpen: boolean;
  setIsOverlapDialogOpen: Dispatch<SetStateAction<boolean>>;
  overlappingEvents: Event[];
  setOverlappingEvents: Dispatch<SetStateAction<Event[]>>;
  startTimeError: string | null;
  setStartTimeError: Dispatch<SetStateAction<string | null>>;
  endTimeError: string | null;
  setEndTimeError: Dispatch<SetStateAction<string | null>>;
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  holidays: { [key: string]: string };
  setHolidays: Dispatch<SetStateAction<{ [key: string]: string }>>;
  cancelRef: RefObject<HTMLButtonElement>;
  toast: ReturnType<typeof useToast>;
  repeatType: RepeatType;
  setRepeatType: Dispatch<SetStateAction<RepeatType>>;
  repeatInterval: number;
  setRepeatInterval: Dispatch<SetStateAction<number>>;
  repeatEndDate: string;
  setRepeatEndDate: Dispatch<SetStateAction<string>>;
  notificationTime: number;
  setNotificationTime: Dispatch<SetStateAction<number>>;
  editingEvent: Event | null;
  setEditingEvent: Dispatch<SetStateAction<Event | null>>;
  isRepeating: boolean;
  setIsRepeating: Dispatch<SetStateAction<boolean>>;
};
