import { apiClient, type ApiResponse } from '@/shared/api';
import type { ApiCharacter } from '../model/character';

export const getCharacters = async (
  params: Record<string, string>,
  signal?: AbortSignal
): Promise<ApiResponse<ApiCharacter>> => {
  const response = await apiClient.get<ApiResponse<ApiCharacter>>(
    '/character',
    {
      params,
      signal
    }
  );

  return response.data;
};
