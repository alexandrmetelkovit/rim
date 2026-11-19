import { useTranslation } from 'react-i18next';
import { LoaderMedium, LoaderSmall } from '@/assets';
import './Loader.scss';

type LoaderSize = 'small' | 'medium';

interface LoaderProps {
  size: LoaderSize;
  text?: string;
}

export const Loader = ({ size, text }: LoaderProps) => {
  const { t } = useTranslation('common');
  const imageSrc = size === 'small' ? LoaderSmall : LoaderMedium;

  return (
    <div
      className={`loader loader_${size}`}
      role='status'
      aria-label={text || t('loader.imgAttribute')}
    >
      <img
        className='loader__image'
        src={imageSrc}
        alt={t('loader.imgAttribute')}
        loading='lazy'
      />
      {!!text && <span className='loader__text'>{text}</span>}
    </div>
  );
};
