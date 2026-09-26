import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  getCharacters,
  type Character,
  type CharacterPayload
} from '@/entities/character';
import { normalizeStatus } from '../lib';
import type { Filters } from '../types';

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
        const params: Record<string, string> = {
          ...(filters.name && { name: filters.name }),
          ...(filters.species && { species: filters.species }),
          ...(filters.gender && { gender: filters.gender }),
          ...(filters.status && { status: filters.status }),
          page: String(page)
        };

        const data = await getCharacters(params, controller.signal);

        const normalizedResults: Character[] = data.results.map(
          (character) => ({
            ...character,
            status: normalizeStatus(character.status)
          })
        );

        await new Promise((resolve) => setTimeout(resolve, 700));

        if (controller.signal.aborted) return;

        if (currentPage === 1) {
          setCharacters(normalizedResults);
        } else {
          setCharacters((prev) => [...prev, ...normalizedResults]);
        }

        setHasMore(data.info.next !== null);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        if (error instanceof Error && error.name === 'CanceledError') {
          return;
        }

        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setCharacters([]);
          setHasMore(false);
          return;
        }

        toast.error('Failed to load characters. Please try again.', {
          id: 'characters-error'
        });

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
