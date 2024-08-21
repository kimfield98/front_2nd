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

const SelectedMajors = ({
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
}) => (
  <Wrap spacing={1} mb={2}>
    {searchOptions.majors.map((major) => (
      <Tag key={major} size="sm" variant="outline" colorScheme="blue">
        <TagLabel>{major.split('<p>').pop()}</TagLabel>
        <TagCloseButton
          onClick={() =>
            changeSearchOption(
              'majors',
              searchOptions.majors.filter((v) => v !== major)
            )
          }
        />
      </Tag>
    ))}
  </Wrap>
);

const MajorItem = ({ major }: { major: string }) => (
  <Box key={major}>
    <Checkbox key={major} size="sm" value={major}>
      {major.replace(/<p>/gi, ' ')}
    </Checkbox>
  </Box>
);

const MajorList = ({ allMajors }: { allMajors: string[] }) => (
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
      <MajorItem key={major} major={major} />
    ))}
  </Stack>
);

function MajorSelection({
  allMajors,
  searchOptions,
  changeSearchOption,
}: MajorSelectionProps) {
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
        <MajorList allMajors={allMajors} />
      </CheckboxGroup>
    </FormControl>
  );
}

export default MajorSelection;
