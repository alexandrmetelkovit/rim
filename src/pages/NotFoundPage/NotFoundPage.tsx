import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NotFoundPageImage } from '@/assets';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div
      className='not-found-page container'
      role='alert'
    >
      <img
        src={NotFoundPageImage}
        alt='Not found page'
        className='not-found-page__image'
      />
      <Link
        to='/'
        className='not-found-page__back'
      >
        {t('notFoundPage.back')}
      </Link>
    </div>
  );
};
