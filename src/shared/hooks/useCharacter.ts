import axios from 'axios';
import { getCharacterById } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { normalizeStatus } from '../lib';

export const useCharacter = (id: number) => {
  const isInvalidId = !id || isNaN(id);

  const {
    data: character,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['character', id],
    queryFn: ({ signal }) => getCharacterById(id, signal),
    select: (response) => ({
      ...response.data,
      status: normalizeStatus(response.data.status)
    }),
    enabled: !isInvalidId,
    staleTime: 5 * 60 * 1000
  });

  const isNotFound =
    isInvalidId ||
    (isError && axios.isAxiosError(error) && error.response?.status === 404);

  return {
    character,
    isLoading,
    isError,
    isNotFound
  };
};
