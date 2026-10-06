import type { AxiosResponse } from 'axios';
import { apiClient } from '@/api';
import type { ApiCharacter } from '@/shared/types';

export const getCharacterById = async (
  id: number,
  signal?: AbortSignal
): Promise<AxiosResponse<ApiCharacter>> => {
  return apiClient.get<ApiCharacter>(`/character/${id}`, {
    signal
  });
};
