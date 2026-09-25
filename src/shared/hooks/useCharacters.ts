import { useCallback, useEffect, useRef, useState } from 'react';
import type { Character, CharacterPayload, Filters } from '@/shared/types';
import { getCharacters } from '../api';
import axios from 'axios';

export const useCharacters = (filters: Filters) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const prevFiltersRef = useRef(filters);

  const loadMore = () => {
    if (isLoading || isLoadingMore || !hasMore) {
      return;
    }

    setPage((prev) => prev + 1);
  };

  const updateCharacter = useCallback(
    (id: number, data: Partial<CharacterPayload>) => {
      setCharacters((prev) =>
        prev.map((character) =>
          character.id === id ? { ...character, ...data } : character
        )
      );
    },
    []
  );

  useEffect(() => {
    const filtersChanged =
      JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters);

    const currentPage = filtersChanged ? 1 : page;

    if (filtersChanged) {
      prevFiltersRef.current = filters;
      setPage(1);
      setCharacters([]);
    }

    const controller = new AbortController();

    const loadCharacters = async () => {
      if (currentPage === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setIsError(false);

      try {
        const data = await getCharacters(
          filters,
          currentPage,
          controller.signal
        );

        await new Promise((resolve) => setTimeout(resolve, 700));

        if (controller.signal.aborted) return;

        if (currentPage === 1) {
          setCharacters(data.results);
        } else {
          setCharacters((prev) => [...prev, ...data.results]);
        }

        setHasMore(data.info.next !== null);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error('Request canceled:', error.message);
          return;
        }

        if (error instanceof Error && error.name === 'CanceledError') {
          console.error('Request canceled (CanceledError)');
          return;
        }

        if (error instanceof Error && error.name === 'AbortError') {
          console.error('Request aborted');
          return;
        }

        console.error(error);
        setIsError(true);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    };

    loadCharacters();

    return () => controller.abort();
  }, [filters, page]);

  return {
    characters,
    isLoading,
    isError,
    loadMore,
    hasMore,
    isLoadingMore,
    updateCharacter
  };
};
