import { useToast } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';

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

export const categories = ['업무', '개인', '가족', '기타'];

export const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

export const notificationOptions = [
  { value: 1, label: '1분 전' },
  { value: 10, label: '10분 전' },
  { value: 60, label: '1시간 전' },
  { value: 120, label: '2시간 전' },
  { value: 1440, label: '1일 전' },
];

export const dummyEvents: Event[] = [];

interface UseEventsReturn {
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

function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>(dummyEvents);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [view, setView] = useState<'week' | 'month'>('month');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isRepeating, setIsRepeating] = useState(false);
  const [repeatType, setRepeatType] = useState<RepeatType>('none');
  const [repeatInterval, setRepeatInterval] = useState(1);
  const [repeatEndDate, setRepeatEndDate] = useState('');
  const [notificationTime, setNotificationTime] = useState(10);
  const [notifications, setNotifications] = useState<
    { id: number; message: string }[]
  >([]);
  const [notifiedEvents, setNotifiedEvents] = useState<number[]>([]);

  const [isOverlapDialogOpen, setIsOverlapDialogOpen] = useState(false);
  const [overlappingEvents, setOverlappingEvents] = useState<Event[]>([]);

  const [startTimeError, setStartTimeError] = useState<string | null>(null);
  const [endTimeError, setEndTimeError] = useState<string | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date());

  const [searchTerm, setSearchTerm] = useState('');
  const [holidays, setHolidays] = useState<{ [key: string]: string }>({});

  const cancelRef = useRef<HTMLButtonElement>(null);

  const toast = useToast();

  const fetchHolidays = async (year: number, month: number) => {
    try {
      const response = await fetch(`/api/holidays?year=${year}&month=${month}`);
      if (!response.ok) {
        throw new Error('Failed to fetch holidays');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching holidays:', error);
      return {};
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: '이벤트 로딩 실패',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const editEvent = (event: Event) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDate(event.date);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setDescription(event.description);
    setLocation(event.location);
    setCategory(event.category);
    setIsRepeating(event.repeat.type !== 'none');
    setRepeatType(event.repeat.type);
    setRepeatInterval(event.repeat.interval);
    setRepeatEndDate(event.repeat.endDate || '');
    setNotificationTime(event.notificationTime);
  };

  const resetForm = () => {
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

  const saveEvent = async (eventData: Event) => {
    try {
      let response;
      if (editingEvent) {
        response = await fetch(`/api/events/${eventData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });
      } else {
        response = await fetch('/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save event');
      }

      await fetchEvents(); // 이벤트 목록 새로고침
      setEditingEvent(null);
      resetForm();
      toast({
        title: editingEvent
          ? '일정이 수정되었습니다.'
          : '일정이 추가되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: '일정 저장 실패',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      await fetchEvents(); // 이벤트 목록 새로고침
      toast({
        title: '일정이 삭제되었습니다.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: '일정 삭제 실패',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    validateTime(newStartTime, endTime);
  };

  const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
    validateTime(startTime, newEndTime);
  };

  const validateTime = (start: string, end: string) => {
    if (!start || !end) return;

    const startDate = new Date(`2000-01-01T${start}`);
    const endDate = new Date(`2000-01-01T${end}`);

    if (startDate >= endDate) {
      setStartTimeError('시작 시간은 종료 시간보다 빨라야 합니다.');
      setEndTimeError('종료 시간은 시작 시간보다 늦어야 합니다.');
    } else {
      setStartTimeError(null);
      setEndTimeError(null);
    }
  };

  const addOrUpdateEvent = async () => {
    if (!title || !date || !startTime || !endTime) {
      toast({
        title: '필수 정보를 모두 입력해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    validateTime(startTime, endTime);
    if (startTimeError || endTimeError) {
      toast({
        title: '시간 설정을 확인해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const eventData: Event = {
      id: editingEvent ? editingEvent.id : Date.now(),
      title,
      date,
      startTime,
      endTime,
      description,
      location,
      category,
      repeat: {
        type: isRepeating ? repeatType : 'none',
        interval: repeatInterval,
        endDate: repeatEndDate || undefined,
      },
      notificationTime,
    };

    // 날짜 문자열을 Date 객체로 변환하는 함수
    const parseDateTime = (date: string, time: string): Date => {
      return new Date(`${date}T${time}`);
    };

    // 두 일정이 겹치는지 확인하는 함수
    const isOverlapping = (event1: Event, event2: Event): boolean => {
      const start1 = parseDateTime(event1.date, event1.startTime);
      const end1 = parseDateTime(event1.date, event1.endTime);
      const start2 = parseDateTime(event2.date, event2.startTime);
      const end2 = parseDateTime(event2.date, event2.endTime);

      return start1 < end2 && start2 < end1;
    };

    // 겹치는 일정을 찾는 함수
    const findOverlappingEvents = (newEvent: Event): Event[] => {
      return events.filter(
        (event) => event.id !== newEvent.id && isOverlapping(event, newEvent)
      );
    };

    const overlapping = findOverlappingEvents(eventData);
    if (overlapping.length > 0) {
      setOverlappingEvents(overlapping);
      setIsOverlapDialogOpen(true);
    } else {
      await saveEvent(eventData);
    }
  };

  const checkUpcomingEvents = async () => {
    const now = new Date();
    const upcomingEvents = events.filter((event) => {
      const eventStart = new Date(`${event.date}T${event.startTime}`);
      const timeDiff = (eventStart.getTime() - now.getTime()) / (1000 * 60);
      return (
        timeDiff > 0 &&
        timeDiff <= event.notificationTime &&
        !notifiedEvents.includes(event.id)
      );
    });

    for (const event of upcomingEvents) {
      try {
        setNotifications((prev) => [
          ...prev,
          {
            id: event.id,
            message: `${event.notificationTime}분 후 ${event.title} 일정이 시작됩니다.`,
          },
        ]);
        setNotifiedEvents((prev) => [...prev, event.id]);
      } catch (error) {
        console.error('Error updating notification status:', error);
      }
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getWeekDates = (date: Date) => {
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

  const navigate = (direction: 'prev' | 'next') => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (view === 'week') {
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
      } else if (view === 'month') {
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
      }
      return newDate;
    });
  };

  const searchEvents = (term: string) => {
    if (!term.trim()) return events;

    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(term.toLowerCase()) ||
        event.description.toLowerCase().includes(term.toLowerCase()) ||
        event.location.toLowerCase().includes(term.toLowerCase())
    );
  };

  const filteredEvents = (() => {
    const filtered = searchEvents(searchTerm);
    return filtered.filter((event) => {
      const eventDate = new Date(event.date);
      if (view === 'week') {
        const weekDates = getWeekDates(currentDate);
        return eventDate >= weekDates[0] && eventDate <= weekDates[6];
      } else if (view === 'month') {
        return (
          eventDate.getMonth() === currentDate.getMonth() &&
          eventDate.getFullYear() === currentDate.getFullYear()
        );
      }
      return true;
    });
  })();

  const formatWeek = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const weekNumber = Math.ceil(date.getDate() / 7);
    return `${year}년 ${month}월 ${weekNumber}주`;
  };

  const formatMonth = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  };

  return {
    fetchHolidays,
    fetchEvents,
    addOrUpdateEvent,
    saveEvent,
    editEvent,
    deleteEvent,
    validateTime,
    checkUpcomingEvents,
    handleStartTimeChange,
    handleEndTimeChange,
    getDaysInMonth,
    getWeekDates,
    navigate,
    searchEvents,
    filteredEvents,
    formatWeek,
    formatMonth,
    events,
    setEvents,
    title,
    setTitle,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    description,
    setDescription,
    location,
    setLocation,
    category,
    setCategory,
    view,
    setView,
    editingEvent,
    setEditingEvent,
    isRepeating,
    setIsRepeating,
    repeatType,
    setRepeatType,
    repeatInterval,
    setRepeatInterval,
    repeatEndDate,
    setRepeatEndDate,
    notificationTime,
    setNotificationTime,
    notifications,
    setNotifications,
    notifiedEvents,
    setNotifiedEvents,
    isOverlapDialogOpen,
    setIsOverlapDialogOpen,
    overlappingEvents,
    setOverlappingEvents,
    startTimeError,
    setStartTimeError,
    endTimeError,
    setEndTimeError,
    currentDate,
    setCurrentDate,
    searchTerm,
    setSearchTerm,
    holidays,
    setHolidays,
    cancelRef,
    toast,
  };
}

export default useEvents;
