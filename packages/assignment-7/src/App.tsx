import { Box, Flex, Heading, VStack } from '@chakra-ui/react';
import useEvents from './hooks/useEvents';
import UseFetchHolidays from './hooks/useFetchHolidays';
import EventForm from './components/EventForm';
import WeekView from './components/WeekView';
import MonthView from './components/MonthView';
import EventList from './components/EventList';
import EventAlert from './components/EventAlert';
import EventNotification from './components/EventNotification';
import ViewSelector from './components/ViewSelector';

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

  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        <EventForm {...formState} addOrUpdateEvent={addOrUpdateEvent} />

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

        <EventList
          {...searchState}
          filteredEvents={filteredEvents}
          notifiedEvents={notificationsState.notifiedEvents}
          deleteEvent={deleteEvent}
          editEvent={formState.editEvent}
        />
      </Flex>

      <EventAlert
        {...dialogState}
        saveEvent={saveEvent}
        cancelRef={cancelRef}
        {...formState}
      />

      <EventNotification {...notificationsState} />
    </Box>
  );
}

export default App;
