import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import type { Character } from '@/shared/types';
import { getCharacters } from '../api';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getCharacters()
      .then((data) => {
        setCharacters(data.results);
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        console.log(error);
        setIsError(true);
        toast.error('Failed to load characters');
        setIsLoading(false);
      });
  }, []);

  return { characters, isLoading, isError };
};
