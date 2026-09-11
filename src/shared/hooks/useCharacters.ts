import { useEffect, useState } from 'react';
import type { Character, Filters } from '@/shared/types';
import { getCharacters } from '../api';
import axios from 'axios';

export const useCharacters = (filters: Filters) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadCharacters = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await getCharacters(filters, controller.signal);
        setCharacters(data.results);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
          setIsLoading(false);
          return;
        }

        if (error instanceof Error && error.name === 'CanceledError') {
          console.log('Request canceled (CanceledError)');
          setIsLoading(false);
          return;
        }

        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Request aborted');
          setIsLoading(false);
          return;
        }

        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    loadCharacters();

    return () => {
      controller.abort();
    };
  }, [filters]);

  return { characters, isLoading, isError };
};
