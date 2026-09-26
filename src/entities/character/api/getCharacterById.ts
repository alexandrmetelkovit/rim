import { apiClient } from '@/shared/api';
import type { ApiCharacter } from '../model/character';

export const getCharacterById = async (
  id: number,
  signal?: AbortSignal
): Promise<ApiCharacter> => {
  const response = await apiClient.get<ApiCharacter>(`/character/${id}`, {
    signal
  });

  return response.data;
};
