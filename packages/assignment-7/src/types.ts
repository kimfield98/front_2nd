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

export interface EventFormProps {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  category: string;
  isRepeating: boolean;
  notificationTime: number;
  repeatType: RepeatType;
  repeatInterval: number;
  repeatEndDate: string;
  addOrUpdateEvent: () => void;
  validateTime: (startTime: string, endTime: string) => void;
  handleStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setTitle: (title: string) => void;
  setDate: (date: string) => void;
  setDescription: (description: string) => void;
  setLocation: (location: string) => void;
  setCategory: (category: string) => void;
  setIsRepeating: (isRepeating: boolean) => void;
  setRepeatType: (repeatType: RepeatType) => void;
  setRepeatInterval: (repeatInterval: number) => void;
  setRepeatEndDate: (repeatEndDate: string) => void;
  setNotificationTime: (notificationTime: number) => void;
  startTimeError: string | null;
  endTimeError: string | null;
  editingEvent: Event | null;
}