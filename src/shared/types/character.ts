import type { STATUS_COLORS } from '@/shared/constants';

export type Status = keyof typeof STATUS_COLORS;

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  gender: string;
  image: string;
  location: { name: string };
  origin: { name: string };
  type: string;
}

export interface CharacterPayload {
  name: string;
  location: { name: string };
  status: Status;
}
