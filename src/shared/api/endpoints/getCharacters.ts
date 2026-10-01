import type { AxiosResponse } from 'axios';
import type { ApiCharacter } from '@/shared/types';
import { apiClient, type ApiResponse } from '@/shared/api';

export const getCharacters = async (
  params: Record<string, string>,
  signal?: AbortSignal
): Promise<AxiosResponse<ApiResponse<ApiCharacter>>> => {
  return apiClient.get<ApiResponse<ApiCharacter>>('/character', {
    params,
    signal
  });
};
