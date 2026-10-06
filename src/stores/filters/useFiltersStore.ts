import { create } from 'zustand';
import type { Filters } from '@/shared/types';

interface FiltersState {
  filters: Filters;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
}

const initialState: Filters = {
  name: '',
  gender: '',
  species: '',
  status: null
};

export const useFiltersStore = create<FiltersState>((set) => ({
  filters: initialState,
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    })),

  resetFilters: () => set({ filters: initialState })
}));
