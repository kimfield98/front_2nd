import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  HStack,
  IconButton,
  Select,
  Text,
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

function App() {
  const {
    saveEvent,
    editEvent,
    deleteEvent,
    filteredEvents,
    title,
    date,
    startTime,
    endTime,
    description,
    location,
    category,
    view,
    setView,
    editingEvent,
    isRepeating,
    repeatType,
    repeatInterval,
    repeatEndDate,
    notificationTime,
    notifications,
    setNotifications,
    notifiedEvents,
    isOverlapDialogOpen,
    setIsOverlapDialogOpen,
    overlappingEvents,
    currentDate,
    searchTerm,
    setSearchTerm,
    cancelRef,
    addOrUpdateEvent,
    validateTime,
    handleStartTimeChange,
    handleEndTimeChange,
    setTitle,
    setDate,
    setDescription,
    setLocation,
    setCategory,
    setIsRepeating,
    setRepeatType,
    setRepeatInterval,
    setRepeatEndDate,
    setNotificationTime,
    startTimeError,
    endTimeError,
  } = useEvents();

  const holidays = UseFetchHolidays(currentDate);

  const eventFormProps = {
    title,
    date,
    startTime,
    endTime,
    description,
    location,
    category,
    isRepeating,
    notificationTime,
    repeatType,
    repeatInterval,
    repeatEndDate,
    addOrUpdateEvent,
    validateTime,
    handleStartTimeChange,
    handleEndTimeChange,
    setTitle,
    setDate,
    setDescription,
    setLocation,
    setCategory,
    setIsRepeating,
    setRepeatType,
    setRepeatInterval,
    setRepeatEndDate,
    setNotificationTime,
    startTimeError,
    endTimeError,
    editingEvent,
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
              onClick={() => navigate(currentDate, 'prev', view)}
            />
            <Select
              aria-label="view"
              value={view}
              onChange={(e) => setView(e.target.value as 'week' | 'month')}
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
            </Select>
            <IconButton
              aria-label="Next"
              icon={<ChevronRightIcon />}
              onClick={() => navigate(currentDate, 'next', view)}
            />
          </HStack>

          {view === 'week' && (
            <WeekView {...{ currentDate, filteredEvents, notifiedEvents }} />
          )}
          {view === 'month' && (
            <MonthView
              {...{ currentDate, filteredEvents, notifiedEvents, holidays }}
            />
          )}
        </VStack>

        <EventList
          {...{
            searchTerm,
            setSearchTerm,
            filteredEvents,
            notifiedEvents,
            deleteEvent,
            editEvent,
          }}
        />
      </Flex>

      <EventAlert
        {...{
          isOverlapDialogOpen,
          setIsOverlapDialogOpen,
          overlappingEvents,
          saveEvent,
          editingEvent,
          title,
          date,
          startTime,
          endTime,
          description,
          location,
          category,
          isRepeating,
          repeatType,
          repeatInterval,
          repeatEndDate,
          notificationTime,
          cancelRef,
        }}
      />

      {notifications.length > 0 && (
        <VStack position="fixed" top={4} right={4} spacing={2} align="flex-end">
          {notifications.map((notification, index) => (
            <Alert key={index} status="info" variant="solid" width="auto">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle fontSize="sm">{notification.message}</AlertTitle>
              </Box>
              <CloseButton
                onClick={() =>
                  setNotifications((prev) => prev.filter((_, i) => i !== index))
                }
              />
            </Alert>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default App;
