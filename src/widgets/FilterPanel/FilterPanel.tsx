import { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchIcon } from '@/assets';
import { useDebounce } from '@/shared/hooks';
import type { Filters } from '@/shared/types';
import { Select, TextInput } from '@/shared/ui';
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
    const { t } = useTranslation();
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
          placeholder={t('filters.namePlaceholder')}
          LeftIcon={SearchIcon}
          value={nameInput}
          onChange={(value) => {
            setNameInput(value);
          }}
        />
        <Select
          options={SPECIES_OPTIONS}
          placeholder={t('filters.speciesPlaceholder')}
          value={filters.species}
          onChange={(value) => updateFilters('species', value)}
        />
        <Select
          options={GENDER_OPTIONS}
          placeholder={t('filters.genderPlaceholder')}
          value={filters.gender}
          onChange={(value) => updateFilters('gender', value)}
        />
        <Select
          options={STATUS_OPTIONS}
          placeholder={t('filters.statusPlaceholder')}
          value={filters.status}
          onChange={(value) => updateFilters('status', value)}
        />
      </div>
    );
  }
);

FilterPanel.displayName = 'FilterPanel';
