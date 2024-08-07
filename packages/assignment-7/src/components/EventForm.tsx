import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { EventFormState, RepeatType } from '../types';
import { CATEGORIES_DUMMY, NOTIFICATION_OPTIONS_DUMMY } from '../dummys';

interface EventFormProps {
  formState: EventFormState;
  addOrUpdateEvent: () => void;
}

function EventForm({
  formState: {
    title,
    setTitle,
    date,
    setDate,
    startTime,
    endTime,
    description,
    setDescription,
    location,
    setLocation,
    category,
    setCategory,
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
    startTimeError,
    endTimeError,
    validateTime,
    editingEvent,
    handleStartTimeChange,
    handleEndTimeChange,
  },
  addOrUpdateEvent,
}: EventFormProps) {
  return (
    <>
      <VStack w="400px" spacing={5} align="stretch">
        <Heading>{editingEvent ? '일정 수정' : '일정 추가'}</Heading>

        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>날짜</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormControl>

        <HStack width="100%">
          <FormControl>
            <FormLabel>시작 시간</FormLabel>
            <Tooltip
              label={startTimeError}
              isOpen={!!startTimeError}
              placement="top"
            >
              <Input
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                onBlur={() => validateTime(startTime, endTime)}
                isInvalid={!!startTimeError}
              />
            </Tooltip>
          </FormControl>
          <FormControl>
            <FormLabel>종료 시간</FormLabel>
            <Tooltip
              label={endTimeError}
              isOpen={!!endTimeError}
              placement="top"
            >
              <Input
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
                onBlur={() => validateTime(startTime, endTime)}
                isInvalid={!!endTimeError}
              />
            </Tooltip>
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>설명</FormLabel>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>위치</FormLabel>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>카테고리</FormLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">카테고리 선택</option>
            {CATEGORIES_DUMMY.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>반복 설정</FormLabel>
          <Checkbox
            isChecked={isRepeating}
            onChange={(e) => setIsRepeating(e.target.checked)}
          >
            반복 일정
          </Checkbox>
        </FormControl>

        <FormControl>
          <FormLabel>알림 설정</FormLabel>
          <Select
            value={notificationTime}
            onChange={(e) => setNotificationTime(Number(e.target.value))}
          >
            {NOTIFICATION_OPTIONS_DUMMY.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>

        {isRepeating && (
          <VStack width="100%">
            <FormControl>
              <FormLabel>반복 유형</FormLabel>
              <Select
                value={repeatType}
                onChange={(e) => setRepeatType(e.target.value as RepeatType)}
              >
                <option value="daily">매일</option>
                <option value="weekly">매주</option>
                <option value="monthly">매월</option>
                <option value="yearly">매년</option>
              </Select>
            </FormControl>
            <HStack width="100%">
              <FormControl>
                <FormLabel>반복 간격</FormLabel>
                <Input
                  type="number"
                  value={repeatInterval}
                  onChange={(e) => setRepeatInterval(Number(e.target.value))}
                  min={1}
                />
              </FormControl>
              <FormControl>
                <FormLabel>반복 종료일</FormLabel>
                <Input
                  type="date"
                  value={repeatEndDate}
                  onChange={(e) => setRepeatEndDate(e.target.value)}
                />
              </FormControl>
            </HStack>
          </VStack>
        )}

        <Button
          data-testid="event-submit-button"
          onClick={addOrUpdateEvent}
          colorScheme="blue"
        >
          {editingEvent ? '일정 수정' : '일정 추가'}
        </Button>
      </VStack>
    </>
  );
}

export default EventForm;
