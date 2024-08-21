import {
  Box,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
} from '@chakra-ui/react';
import { memo, useCallback, useMemo } from 'react';

interface SearchOption {
  query?: string;
  grades: number[];
  days: string[];
  times: number[];
  majors: string[];
  credits?: number;
}

interface MajorSelectionProps {
  allMajors: string[];
  searchOptions: {
    majors: string[];
  };
  changeSearchOption: (
    field: keyof SearchOption,
    value: SearchOption[typeof field]
  ) => void;
}

const SelectedMajors = memo(
  ({
    searchOptions,
    changeSearchOption,
  }: {
    searchOptions: {
      majors: string[];
    };
    changeSearchOption: (
      field: keyof SearchOption,
      value: SearchOption[typeof field]
    ) => void;
  }) => {
    const handleRemoveMajor = useCallback(
      (majorToRemove: string) => {
        changeSearchOption(
          'majors',
          searchOptions.majors.filter((major) => major !== majorToRemove)
        );
      },
      [searchOptions.majors, changeSearchOption]
    );
    return (
      <Wrap spacing={1} mb={2}>
        {searchOptions.majors.map((major) => (
          <Tag key={major} size="sm" variant="outline" colorScheme="blue">
            <TagLabel>{major.split('<p>').pop()}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveMajor(major)} />
          </Tag>
        ))}
      </Wrap>
    );
  }
);

const MajorItem = memo(
  ({
    major,
    isChecked,
    onToggle,
  }: {
    major: string;
    isChecked: boolean;
    onToggle: (major: string) => void;
  }) => (
    <Box key={major}>
      <Checkbox
        size="sm"
        isChecked={isChecked}
        onChange={() => onToggle(major)}
      >
        {major.replace(/<p>/gi, ' ')}
      </Checkbox>
    </Box>
  )
);

const MajorList = memo(
  ({
    allMajors,
    selectedMajors,
    onToggleMajor,
  }: {
    allMajors: string[];
    selectedMajors: string[];
    onToggleMajor: (major: string) => void;
  }) => (
    <Stack
      spacing={2}
      overflowY="auto"
      h="100px"
      border="1px solid"
      borderColor="gray.200"
      borderRadius={5}
      p={2}
    >
      {allMajors.map((major) => (
        <MajorItem
          key={major}
          major={major}
          isChecked={selectedMajors.includes(major)}
          onToggle={onToggleMajor}
        />
      ))}
    </Stack>
  )
);

function MajorSelection({
  allMajors,
  searchOptions,
  changeSearchOption,
}: MajorSelectionProps) {
  const handleToggleMajor = useCallback(
    (major: string) => {
      const newMajors = searchOptions.majors.includes(major)
        ? searchOptions.majors.filter((m) => m !== major)
        : [...searchOptions.majors, major];
      changeSearchOption('majors', newMajors);
    },
    [searchOptions.majors, changeSearchOption]
  );
  const memoizedAllMajors = useMemo(() => allMajors, [allMajors]);

  return (
    <FormControl>
      <FormLabel>전공</FormLabel>
      <CheckboxGroup
        colorScheme="green"
        value={searchOptions.majors}
        onChange={(values) => changeSearchOption('majors', values as string[])}
      >
        <SelectedMajors
          searchOptions={searchOptions}
          changeSearchOption={changeSearchOption}
        />
        <MajorList
          allMajors={memoizedAllMajors}
          selectedMajors={searchOptions.majors}
          onToggleMajor={handleToggleMajor}
        />
      </CheckboxGroup>
    </FormControl>
  );
}

export default memo(MajorSelection);
