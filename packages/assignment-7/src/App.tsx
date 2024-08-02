import { Box, Flex } from '@chakra-ui/react';
import useEvents from './hooks/useEvents';
import UseFetchHolidays from './hooks/useFetchHolidays';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import EventAlert from './components/EventAlert';
import EventNotification from './components/EventNotification';
import EventDisplay from './components/EventDisplay';
import { SetStateAction } from 'react';

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

        <EventDisplay
          viewState={{ ...viewState }}
          currentDateState={{ ...currentDateState }}
          notificationsState={{ ...notificationsState }}
          filteredEvents={filteredEvents}
          holidays={holidays}
        />

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
