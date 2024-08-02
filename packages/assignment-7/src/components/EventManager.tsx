import { Box, Flex } from '@chakra-ui/react';
import EventForm from './EventForm';
import EventDisplay from './EventDisplay';
import EventList from './EventList';
import EventAlert from './EventAlert';
import EventNotification from './EventNotification';
import { EventManagerProps } from '../types';

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
}: EventManagerProps) {
  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        <EventForm
          formState={{ ...formState }}
          addOrUpdateEvent={addOrUpdateEvent}
        />

        <EventDisplay
          viewState={{ ...viewState }}
          currentDateState={{ ...currentDateState }}
          notificationsState={{ ...notificationsState }}
          filteredEvents={filteredEvents}
          holidays={holidays}
        />

        <EventList
          searchState={{ ...searchState }}
          filteredEvents={filteredEvents}
          notifiedEvents={notificationsState.notifiedEvents}
          editEvent={formState.editEvent}
          deleteEvent={deleteEvent}
        />
      </Flex>

      <EventAlert
        formState={{ ...formState }}
        dialogState={{ ...dialogState }}
        saveEvent={saveEvent}
        cancelRef={cancelRef}
      />

      <EventNotification notification={{ ...notificationsState }} />
    </Box>
  );
}

export default EventManager;
