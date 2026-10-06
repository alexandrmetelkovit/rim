import type { AxiosResponse } from 'axios';
import type { ApiCharacter } from '@/shared/types';
import { apiClient, type ResponseFromBackend } from '@/api';

export const getCharacters = async (
  params: Record<string, string>,
  signal?: AbortSignal
): Promise<AxiosResponse<ResponseFromBackend<ApiCharacter>>> => {
  return apiClient.get<ResponseFromBackend<ApiCharacter>>('/character', {
    params,
    signal
  });
};
