import axios from 'axios';
import { apiClient } from '../client';
import type { Character, Filters } from '@/shared/types';
import { normalizeStatus } from '@/shared/lib';

export async function getCharacters(filters: Filters, signal?: AbortSignal) {
  const params = new URLSearchParams();

  if (filters.name) params.append('name', filters.name);
  if (filters.species) params.append('species', filters.species);
  if (filters.gender) params.append('gender', filters.gender);
  if (filters.status) params.append('status', filters.status);

  try {
    const response = await apiClient.get('/character', { params, signal });
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

    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: []
      };
    }

    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.warn('No characters found for filters:', filters);
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: []
      };
    }

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
