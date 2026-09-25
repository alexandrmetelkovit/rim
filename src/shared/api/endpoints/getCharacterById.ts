import { normalizeStatus } from '@/shared/lib';
import { apiClient } from '../client';
import axios from 'axios';
import type { Character } from '@/shared/types';

export async function getCharacterById(
  id: number,
  signal?: AbortSignal
): Promise<Character> {
  try {
    const response = await apiClient.get<Character>(`/character/${id}`, {
      signal
    });

    const normalizedCharacter: Character = {
      ...response.data,
      status: normalizeStatus(response.data.status)
    };

    return normalizedCharacter;
  } catch (error) {
    // Отмена запроса
    if (axios.isCancel(error)) {
      throw error;
    }

    // 404 — персонаж не найден
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Character not found', { cause: error });
    }

    // Все остальные ошибки
    throw error;
  }
}
