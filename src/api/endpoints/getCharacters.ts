import type { AxiosResponse } from 'axios';
import type { ApiCharacter } from '@/shared/types';
import { apiClient, type ApiResponse } from '@/api';

export const getCharacters = async (
  params: Record<string, string | number | null | undefined>,
  signal?: AbortSignal
): Promise<AxiosResponse<ApiResponse<ApiCharacter>>> => {
  return apiClient.get<ApiResponse<ApiCharacter>>('/character', {
    params,
    signal
  });
};
