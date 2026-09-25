import { useEffect, useState } from 'react';
import type { Character } from '../types';
import { getCharacterById } from '../api/endpoints/getCharacterById';
import axios from 'axios';

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

        await new Promise((resolve) => setTimeout(resolve, 700));

        if (controller.signal.aborted) return;

        setCharacter(data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setIsLoading(false);
        setIsError(true);
      }
    };

    loadCharacter();
    return () => controller.abort();
  }, [id]);

  return { character, isLoading, isError };
};
