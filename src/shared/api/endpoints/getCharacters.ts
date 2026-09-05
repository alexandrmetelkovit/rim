import axios from 'axios';
import { apiClient } from '../client';
import type { Character } from '@/shared/types';
import { normalizeStatus } from '@/shared/lib';

export async function getCharacters() {
  try {
    const response = await apiClient.get('/character');

    const normalizedResults = response.data.results.map(
      (character: Character) => ({
        ...character,
        status: normalizeStatus(character.status)
      })
    );

    return {
      ...response.data,
      results: normalizedResults
    };
  } catch (error) {
    let errorMessage = 'An error occurred while loading data: ';

    if (axios.isAxiosError(error)) {
      const axiosError = error;

      if (axiosError.response) {
        errorMessage = `Server error: ${axiosError.response.status} - ${axiosError.response.data.message}`;
      } else if (axiosError.request) {
        errorMessage = 'No response from the server';
      } else {
        errorMessage = `Error: ${axiosError.message}`;
      }
    } else if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
    }
    console.error(errorMessage);

    throw error;
  }
}
