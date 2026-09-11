import type { Status } from './character';

export interface Filters {
  name: string;
  species: string;
  gender: string;
  status: Status | null;
}
