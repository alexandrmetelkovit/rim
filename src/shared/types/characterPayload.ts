import type { Status } from './character';

export interface CharacterPayload {
  name: string;
  location: { name: string };
  status: Status;
}
