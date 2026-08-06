import { LoaderMedium } from '@/shared/assets';
import './Loader.scss';

type LoaderSize = 'small' | 'medium';

interface LoaderProps {
  size: LoaderSize;
  text?: string;
}

export const Loader = ({ size, text }: LoaderProps) => {
  return (
    <div
      className={`loader loader--${size}`}
      role='status'
      aria-label='loading...'
    >
      <img
        className='loader__image'
        src={LoaderMedium}
        alt='Loading...'
        loading='lazy'
      />
      {!!text && <span className='loader__text'>{text}</span>}
    </div>
  );
};
