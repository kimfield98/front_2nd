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

export type ViewType = 'week' | 'month';

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
interface Notification {
  id: number;
  message: string;
}

export interface EventFormState {
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
  isRepeating: boolean;
  setIsRepeating: Dispatch<SetStateAction<boolean>>;
  repeatType: RepeatType;
  setRepeatType: Dispatch<SetStateAction<RepeatType>>;
  repeatInterval: number;
  setRepeatInterval: Dispatch<SetStateAction<number>>;
  repeatEndDate: string;
  setRepeatEndDate: Dispatch<SetStateAction<string>>;
  notificationTime: number;
  setNotificationTime: Dispatch<SetStateAction<number>>;
  editingEvent: Event | null;
  startTimeError: string | null;
  endTimeError: string | null;
  validateTime: (startTime: string, endTime: string) => void;
  handleStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editEvent: (event: Event) => void;
}

export interface ViewState {
  view: ViewType;
  setView: Dispatch<SetStateAction<ViewType>>;
}

export interface CurrentDateState {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
}

export interface NotificationsState {
  notifications: Notification[];
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
  notifiedEvents: number[];
  setNotifiedEvents: Dispatch<SetStateAction<number[]>>;
}

export interface SearchState {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export interface DialogState {
  isOverlapDialogOpen: boolean;
  setIsOverlapDialogOpen: Dispatch<SetStateAction<boolean>>;
  overlappingEvents: Event[];
  setOverlappingEvents: Dispatch<SetStateAction<Event[]>>;
}

export interface EventManagerProps {
  formState: EventFormState;
  viewState: ViewState;
  currentDateState: CurrentDateState;
  notificationsState: NotificationsState;
  searchState: SearchState;
  dialogState: DialogState;
  filteredEvents: Event[];
  holidays: Record<string, string>;
  cancelRef: RefObject<any>;
  addOrUpdateEvent: () => void;
  deleteEvent: (id: number) => void;
  saveEvent: (event: Event) => void;
}
