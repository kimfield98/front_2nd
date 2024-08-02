import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Select,
  VStack,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import useEvents from './hooks/useEvents';
import { navigate } from './utils';
import UseFetchHolidays from './hooks/useFetchHolidays';
import EventForm from './components/EventForm';
import WeekView from './components/WeekView';
import MonthView from './components/MonthView';
import EventList from './components/EventList';
import EventAlert from './components/EventAlert';
import EventNotification from './components/EventNotification';

function App() {
  const {
    formState,
    notificationsState,
    viewState,
    dialogState,
    currentDateState,
    searchState,
    cancelRef,
    saveEvent,
    deleteEvent,
    addOrUpdateEvent,
    filteredEvents,
  } = useEvents();

  const holidays = UseFetchHolidays(currentDateState.currentDate);

  const eventFormProps = {
    ...formState,
    addOrUpdateEvent,
  };

  const eventAlertProps = {
    ...dialogState,
    saveEvent,
    cancelRef,
    ...formState,
  };

  const eventNotificationProps = {
    ...notificationsState,
  };

  const eventListProps = {
    ...searchState,
    filteredEvents,
    notifiedEvents: notificationsState.notifiedEvents,
    deleteEvent,
    editEvent: formState.editEvent,
  };

  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        <EventForm {...eventFormProps} />

        <VStack flex={1} spacing={5} align="stretch">
          <Heading>일정 보기</Heading>

          <HStack mx="auto" justifyContent="space-between">
            <IconButton
              aria-label="Previous"
              icon={<ChevronLeftIcon />}
              onClick={() =>
                navigate(currentDateState.currentDate, 'prev', viewState.view)
              }
            />
            <Select
              aria-label="view"
              value={viewState.view}
              onChange={(e) =>
                viewState.setView(e.target.value as 'week' | 'month')
              }
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
            </Select>
            <IconButton
              aria-label="Next"
              icon={<ChevronRightIcon />}
              onClick={() =>
                navigate(currentDateState.currentDate, 'next', viewState.view)
              }
            />
          </HStack>

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

        <EventList {...eventListProps} />
      </Flex>

      <EventAlert {...eventAlertProps} />

      <EventNotification {...eventNotificationProps} />
    </Box>
  );
}

export default App;
