import type { STATUS_COLORS } from '@/shared/constants';

export type Status = keyof typeof STATUS_COLORS;

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
}

export interface ApiCharacter extends Omit<Character, 'status'> {
  status: string;
}
