import { STATUS_OPTIONS } from '@/shared/constants';

export const normalizeStatus = (status: string): string => {
  return (
    STATUS_OPTIONS.find((option) => option.value === status.toLowerCase())
      ?.value ?? 'unknown'
  );
};
