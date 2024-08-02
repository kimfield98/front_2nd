import { Heading, VStack } from '@chakra-ui/react';
import ViewSelector from './ViewSelector';
import WeekView from './WeekView';
import MonthView from './MonthView';
import { Event } from '../types';

interface EventDisplayProps {
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
    setNotifications: React.Dispatch<
      React.SetStateAction<
        {
          id: number;
          message: string;
        }[]
      >
    >;
    notifiedEvents: number[];
    setNotifiedEvents: React.Dispatch<React.SetStateAction<number[]>>;
  };
  filteredEvents: Event[];
  holidays: Record<string, string>;
}

function EventDisplay({
  viewState,
  currentDateState,
  notificationsState,
  filteredEvents,
  holidays,
}: EventDisplayProps) {
  return (
    <VStack flex={1} spacing={5} align="stretch">
      <Heading>일정 보기</Heading>
      <ViewSelector {...viewState} {...currentDateState} />

      {viewState.view === 'week' && (
        <WeekView
          currentDate={currentDateState.currentDate}
          filteredEvents={filteredEvents}
          notifiedEvents={notificationsState.notifiedEvents}
        />
      )}
      {viewState.view === 'month' && (
        <MonthView
          currentDate={currentDateState.currentDate}
          filteredEvents={filteredEvents}
          notifiedEvents={notificationsState.notifiedEvents}
          holidays={holidays}
        />
      )}
    </VStack>
  );
}

export default EventDisplay;
