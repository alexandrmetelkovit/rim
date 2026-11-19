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
    const { t } = useTranslation('characters');
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
          value={filters.species}
          onChange={(value) => updateFilters('species', value)}
          placeholder={t('filters.speciesPlaceholder')}
        />
        <Select
          options={GENDER_OPTIONS}
          value={filters.gender}
          onChange={(value) => updateFilters('gender', value)}
          placeholder={t('filters.genderPlaceholder')}
        />
        <Select
          options={STATUS_OPTIONS}
          value={filters.status}
          onChange={(value) => updateFilters('status', value)}
          placeholder={t('filters.statusPlaceholder')}
        />
      </div>
    );
  }
);

FilterPanel.displayName = 'FilterPanel';
