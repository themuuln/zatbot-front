import type { FilterTypes } from '@/types';
import type { Dispatch, SetStateAction } from 'react';

export type FilterProps = {
  filter: FilterTypes;
  setFilter: Dispatch<SetStateAction<FilterTypes>>;
  onSearch: () => void;
  onClear: () => void;
};
