import type { STATUS_COLORS } from '@/shared/constants';

export type Status = keyof typeof STATUS_COLORS;

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  gender: string;
  location: { name: string };
  image: string;
}

export interface CharacterPayload {
  name: string;
  location: string;
  status: Status;
}
