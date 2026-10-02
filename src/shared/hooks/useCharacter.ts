import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { normalizeStatus } from '../lib';
import { getCharacterById } from '../api';
import type { Character } from '../types';

export const useCharacter = (id: number) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(!!id && !isNaN(id));
  const [isError, setIsError] = useState(false);
  const [isNotFoundFromApi, setIsNotFoundFromApi] = useState(false);

  const isInvalidId = !id || isNaN(id);
  const isNotFound = isInvalidId || isNotFoundFromApi;

  useEffect(() => {
    if (isInvalidId) return;

    const controller = new AbortController();

    const loadCharacter = async () => {
      setIsLoading(true);
      setIsError(false);
      setIsNotFoundFromApi(false);

      try {
        const response = await getCharacterById(id, controller.signal);
        const data = response.data;

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
          setIsNotFoundFromApi(true);
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
  }, [id, isInvalidId]);

  return { character, isLoading, isError, isNotFound };
};
