import { http, HttpResponse } from 'msw';
import { Event } from './types';

const INITIAL_EVENTS_DUMMY: Event[] = [
  {
    id: 1,
    title: '팀 회의',
    date: '2024-08-20',
    startTime: '10:00',
    endTime: '11:00',
    description: '주간 팀 미팅',
    location: '회의실 A',
    category: '업무',
    repeat: { type: 'weekly', interval: 1 },
    notificationTime: 1,
  },
  {
    id: 2,
    title: '점심 약속',
    date: '2024-08-21',
    startTime: '12:30',
    endTime: '13:30',
    description: '동료와 점심 식사',
    location: '회사 근처 식당',
    category: '개인',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 1,
  },
  {
    id: 3,
    title: '프로젝트 마감',
    date: '2024-08-25',
    startTime: '09:00',
    endTime: '18:00',
    description: '분기별 프로젝트 마감',
    location: '사무실',
    category: '업무',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 1,
  },
  {
    id: 4,
    title: '생일 파티',
    date: '2024-08-28',
    startTime: '19:00',
    endTime: '22:00',
    description: '친구 생일 축하',
    location: '친구 집',
    category: '개인',
    repeat: { type: 'yearly', interval: 1 },
    notificationTime: 1,
  },
  {
    id: 5,
    title: '운동',
    date: '2024-08-22',
    startTime: '18:00',
    endTime: '19:00',
    description: '주간 운동',
    location: '헬스장',
    category: '개인',
    repeat: { type: 'weekly', interval: 1 },
    notificationTime: 1,
  },
  {
    id: 6,
    title: '알림 테스트',
    description: '알림 테스트',
    location: '알림 테스트',
    category: '개인',
    repeat: { type: 'weekly', interval: 1 },
    notificationTime: 10,
    ...(() => {
      const now = new Date();
      const startTime = new Date(now.getTime() + 5 * 60000); // 5분 후
      const endTime = new Date(startTime.getTime() + 60 * 60000); // 시작시간으로부터 1시간 후

      const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
      };

      const formatTime = (date: Date) => {
        return date.toTimeString().split(' ')[0].substring(0, 5);
      };

      return {
        date: formatDate(now),
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
      };
    })(),
  },
];

const HOLIDAYS_DUMMY = {
  '2024-01-01': '신정',
  '2024-02-09': '설날',
  '2024-02-10': '설날',
  '2024-02-11': '설날',
  '2024-03-01': '삼일절',
  '2024-05-05': '어린이날',
  '2024-06-06': '현충일',
  '2024-08-15': '광복절',
  '2024-09-16': '추석',
  '2024-09-17': '추석',
  '2024-09-18': '추석',
  '2024-10-03': '개천절',
  '2024-10-09': '한글날',
  '2024-12-25': '크리스마스',
};

let events = [...INITIAL_EVENTS_DUMMY];

export const resetMockData = () => {
  events = [...INITIAL_EVENTS_DUMMY];
};

export const mockApiHandlers = [
  http.get('/api/events', () => {
    return HttpResponse.json(events);
  }),

  http.post('/api/events', async ({ request }) => {
    const newEvent = (await request.json()) as Event;
    newEvent.id = events.length + 1;
    events.push(newEvent);
    return HttpResponse.json(newEvent, { status: 201 });
  }),

  http.put('/api/events/:id', async ({ params, request }) => {
    const id = parseInt(String(params.id), 10);
    const updatedEvent = (await request.json()) as Event;
    const eventIndex = events.findIndex((event) => event.id === id);
    if (eventIndex > -1) {
      events[eventIndex] = { ...events[eventIndex], ...updatedEvent };
      return HttpResponse.json(events[eventIndex], { status: 200 });
    } else {
      return HttpResponse.json({ message: 'Event not found' }, { status: 404 });
    }
  }),

  http.delete('/api/events/:id', ({ params }) => {
    const id = parseInt(String(params.id), 10);
    const eventIndex = events.findIndex((event) => event.id === id);
    if (eventIndex > -1) {
      events.splice(eventIndex, 1);
      return new HttpResponse(null, { status: 204 });
    } else {
      return HttpResponse.json({ message: 'Event not found' }, { status: 404 });
    }
  }),

  http.get('/api/holidays', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    if (!year || !month) {
      return HttpResponse.json(
        { message: 'year or month are required' },
        { status: 400 }
      );
    }
    const filteredHolidays = Object.entries(HOLIDAYS_DUMMY).reduce(
      (acc, [date, name]) => {
        if (date.startsWith(`${year}-${month.padStart(2, '0')}`)) {
          acc[date] = name;
        }
        return acc;
      },
      {} as Record<string, string>
    );
    return HttpResponse.json(filteredHolidays);
  }),
];
