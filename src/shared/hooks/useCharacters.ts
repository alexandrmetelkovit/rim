import { useCallback } from 'react';
import { getCharacters, type ApiResponse } from '@/api';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { normalizeStatus } from '../lib';
import type { ApiCharacter, CharacterPayload, Filters } from '../types';

export const useCharacters = (filters: Filters) => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['characters', filters],
    queryFn: ({ pageParam, signal }) => {
      const params = {
        ...filters,
        page: String(pageParam)
      };

      return getCharacters(params, signal);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: { data: ApiResponse<ApiCharacter> }) => {
      const nextPageUrl = lastPage.data.info.next;
      if (!nextPageUrl) return undefined;
      const nextPage = Number(new URL(nextPageUrl).searchParams.get('page'));
      return nextPage;
    },
    select: (data: {
      pages: { data: ApiResponse<ApiCharacter> }[];
      pageParams: number[];
    }) => ({
      pages: data.pages.map((page) => ({
        ...page.data,
        results: page.data.results.map((character) => ({
          ...character,
          status: normalizeStatus(character.status)
        }))
      })),
      pageParams: data.pageParams
    })
  });

  const characters = data?.pages.flatMap((page) => page.results) ?? [];

  const updateCharacter = useCallback(
    (id: number, updates: Partial<CharacterPayload>) => {
      queryClient.setQueryData(
        ['characters', filters],
        (
          oldData:
            | {
                pages: { data: ApiResponse<ApiCharacter> }[];
                pageParams: number[];
              }
            | undefined
        ) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                results: page.data.results.map((character) =>
                  character.id === id ? { ...character, ...updates } : character
                )
              }
            }))
          };
        }
      );
    },
    [queryClient, filters]
  );

  return {
    characters,
    isLoading,
    isError,
    loadMore: fetchNextPage,
    hasMore: hasNextPage ?? false,
    isLoadingMore: isFetchingNextPage,
    updateCharacter
  };
};
