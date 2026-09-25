// import { STATUS_OPTIONS } from '@/shared/constants';
import type { Status } from '@/shared/types';

export const normalizeStatus = (status: string): Status => {
  const normalized = status.toLowerCase();

  return normalized === 'alive' ||
    normalized === 'dead' ||
    normalized === 'unknown'
    ? normalized
    : 'unknown';

  // return (
  //   STATUS_OPTIONS.find((option) => option.value === status.toLowerCase())
  //     ?.value ?? 'unknown'
  // );
};
