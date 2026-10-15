import { useCallback, useTransition } from 'react';
import { useFiltersStore } from '@/stores';
import type { Filters } from '../types';
import { useCharacters } from './useCharacters';

export const useCharactersWithFilters = () => {
  const filters = useFiltersStore((state) => state.filters);
  const setFilter = useFiltersStore((state) => state.setFilter);
  const resetFilters = useFiltersStore((state) => state.resetFilters);
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      startTransition(() => {
        setFilter(key, value);
      });
    },
    [setFilter]
  );

  const charactersState = useCharacters(filters);

  return {
    ...charactersState,
    filters,
    handleFilterChange,
    isPending,
    resetFilters
  };
};
