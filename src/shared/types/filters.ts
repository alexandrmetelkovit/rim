import type { Status } from '../../entities/character/model/character';

export interface Filters {
  name: string;
  species: string;
  gender: string;
  status: Status | null;
}
