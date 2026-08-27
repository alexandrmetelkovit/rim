import type { Status } from './statusType';

export interface CharacterPayload {
  name: string;
  location: string;
  status: Status;
}
