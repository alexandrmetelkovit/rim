import { memo, useEffect, useRef, useState } from 'react';
import { SearchIcon } from '@/shared/assets';
import { useDebounce } from '@/shared/hooks';
import type { Filters } from '@/shared/types';
import { Select, TextInput } from '@/shared/components';
import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/shared/constants';
import './FilterPanel.scss';

export interface FilterPanelProps {
  filters: Filters;
  updateFilters: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
}

export const FilterPanel = memo(
  ({ filters, updateFilters }: FilterPanelProps) => {
    const [nameInput, setNameInput] = useState(filters.name);
    const debouncedName = useDebounce(nameInput, 500);
    const updateFiltersRef = useRef(updateFilters);

    useEffect(() => {
      updateFiltersRef.current = updateFilters;
    }, [updateFilters]);

    useEffect(() => {
      if (debouncedName !== filters.name) {
        updateFiltersRef.current('name', debouncedName);
      }
    }, [debouncedName, filters.name]);

    return (
      <div className='filter-panel'>
        <TextInput
          id='filter-name'
          variant='bordered'
          placeholder='Filter by name...'
          LeftIcon={SearchIcon}
          value={nameInput}
          onChange={(value) => {
            setNameInput(value);
          }}
        />
        <Select
          options={SPECIES_OPTIONS}
          placeholder='Species'
          value={filters.species}
          onChange={(value) => updateFilters('species', value)}
        />
        <Select
          options={GENDER_OPTIONS}
          placeholder='Gender'
          value={filters.gender}
          onChange={(value) => updateFilters('gender', value)}
        />
        <Select
          options={STATUS_OPTIONS}
          placeholder='Status'
          value={filters.status}
          onChange={(value) => updateFilters('status', value)}
        />
      </div>
    );
  }
);

FilterPanel.displayName = 'FilterPanel';
