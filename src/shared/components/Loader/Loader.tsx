import { LoaderMedium, LoaderSmall } from '@/shared/assets';
import './Loader.scss';

type LoaderSize = 'small' | 'medium';

interface LoaderProps {
  size: LoaderSize;
  text?: string;
}

export const Loader = ({ size, text }: LoaderProps) => {
  const imageSrc = size === 'small' ? LoaderSmall : LoaderMedium;

  return (
    <div
      className={`loader loader--${size}`}
      role='status'
      aria-label='loading...'
    >
      <img
        className='loader__image'
        src={imageSrc}
        alt='Loading...'
        loading='lazy'
      />
      {!!text && <span className='loader__text'>{text}</span>}
    </div>
  );
};
