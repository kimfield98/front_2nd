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

export interface EventManagerProps {
  formState: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    description: string;
    location: string;
    category: string;
    isRepeating: boolean;
    repeatType: RepeatType;
    repeatInterval: number;
    repeatEndDate: string;
    notificationTime: number;
    editingEvent: Event | null;
    startTimeError: string | null;
    endTimeError: string | null;
    validateTime: (startTime: string, endTime: string) => void;
    editEvent: (event: Event) => void;
  };
  viewState: {
    view: 'week' | 'month';
    setView: (view: 'week' | 'month') => void;
  };
  currentDateState: { currentDate: Date; setCurrentDate: (date: Date) => void };
  notificationsState: {
    notifications: {
      id: number;
      message: string;
    }[];
    setNotifications: Dispatch<
      SetStateAction<{ id: number; message: string }[]>
    >;
    notifiedEvents: number[];
    setNotifiedEvents: Dispatch<SetStateAction<number[]>>;
  };
  searchState: {
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
  };
  dialogState: {
    isOverlapDialogOpen: boolean;
    setIsOverlapDialogOpen: Dispatch<SetStateAction<boolean>>;
    overlappingEvents: Event[];
    setOverlappingEvents: Dispatch<SetStateAction<Event[]>>;
  };
  filteredEvents: Event[];
  holidays: Record<string, string>;
  cancelRef: RefObject<any>;
  addOrUpdateEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
  saveEvent: (event: Event) => void;
}
