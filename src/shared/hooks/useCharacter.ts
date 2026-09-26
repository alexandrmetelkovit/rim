import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getCharacterById, type Character } from '@/entities/character';
import { normalizeStatus } from '../lib';

export const useCharacter = (id: number) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(!!id && !isNaN(id));
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id || isNaN(id)) return;

    const controller = new AbortController();

    const loadCharacter = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await getCharacterById(id, controller.signal);

        const normalizedCharacter: Character = {
          ...data,
          status: normalizeStatus(data.status)
        };

        await new Promise((resolve) => setTimeout(resolve, 700));

        if (controller.signal.aborted) return;

        setCharacter(normalizedCharacter);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setIsError(true);
          setIsLoading(false);
          return;
        }

        toast.error('Failed to load character. Please try again.');

        setIsLoading(false);
        setIsError(true);
      }
    };

    loadCharacter();
    return () => controller.abort();
  }, [id]);

  return { character, isLoading, isError };
};
