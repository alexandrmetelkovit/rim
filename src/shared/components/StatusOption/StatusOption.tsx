import { STATUS_COLORS } from '@/shared/constants';
import type { Status } from '@/shared/types';
import './StatusOption.scss';

export interface StatusOptionProps {
  statusColor: Status;
}

export const StatusOption = ({ statusColor = 'alive' }: StatusOptionProps) => {
  const color = STATUS_COLORS[statusColor];

  return <span className={`status-option status-option_${color}`}></span>;
};
