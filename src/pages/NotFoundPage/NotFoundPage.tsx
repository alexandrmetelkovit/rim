import { Link } from 'react-router-dom';
import { NotFoundPageImage } from '@/shared/assets';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
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
        Go to main page
      </Link>
    </div>
  );
};
