import type { Status } from '@/entities/character';

export const normalizeStatus = (status: string): Status => {
  const normalized = status.toLowerCase();

  return normalized === 'alive' ||
    normalized === 'dead' ||
    normalized === 'unknown'
    ? normalized
    : 'unknown';
};
