import { useCallback, useState } from 'react';
import type { Filters } from '@/shared/types';

const INITIAL_FILTERS: Filters = {
  name: '',
  gender: '',
  species: '',
  status: null
};

export const useFilters = () => {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const updateFilters = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return { filters, updateFilters };
};
