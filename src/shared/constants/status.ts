import type { Status } from '../types';
import type { Option } from '../components';

export const STATUS_COLORS = {
  alive: 'green',
  dead: 'red',
  unknown: 'orange'
} as const;

export const STATUS_OPTIONS: Option<Status>[] = [
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' }
];
