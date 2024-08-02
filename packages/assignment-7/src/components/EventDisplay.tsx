import { Heading, VStack } from '@chakra-ui/react';
import ViewSelector from './ViewSelector';
import WeekView from './WeekView';
import MonthView from './MonthView';
import {
  CurrentDateState,
  Event,
  NotificationsState,
  ViewState,
} from '../types';

function EventDisplay({
  viewState,
  currentDateState,
  notificationsState,
  filteredEvents,
  holidays,
}: {
  viewState: ViewState;
  currentDateState: CurrentDateState;
  notificationsState: NotificationsState;
  filteredEvents: Event[];
  holidays: Record<string, string>;
}) {
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
