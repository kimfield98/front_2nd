import { Box, Flex } from '@chakra-ui/react';
import EventForm from './EventForm';
import EventDisplay from './EventDisplay';
import EventList from './EventList';
import EventAlert from './EventAlert';
import EventNotification from './EventNotification';

interface EventManagerProps {
  formState: any;
  viewState: any;
  currentDateState: any;
  notificationsState: any;
  searchState: any;
  dialogState: any;
  filteredEvents: any[];
  holidays: Record<string, string>;
  cancelRef: any;
  addOrUpdateEvent: (event: any) => void;
  deleteEvent: (id: number) => void;
  saveEvent: (event: any) => void;
}

function EventManager({
  formState,
  viewState,
  currentDateState,
  notificationsState,
  searchState,
  dialogState,
  filteredEvents,
  holidays,
  cancelRef,
  addOrUpdateEvent,
  deleteEvent,
  saveEvent,
}:EventManagerProps) {
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

export default EventManager;
