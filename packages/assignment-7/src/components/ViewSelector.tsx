import { HStack, IconButton, Select } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { navigate } from '../utils';

interface ViewSelectorProps {
  currentDate: Date;
  view: 'week' | 'month';
  setView: (view: 'week' | 'month') => void;
}

function ViewSelector({ currentDate, view, setView }: ViewSelectorProps) {
  return (
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
  );
}

export default ViewSelector;
