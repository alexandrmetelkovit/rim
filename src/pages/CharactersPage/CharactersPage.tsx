import { Loader } from '@/shared/components';
import { BannerCharactersPage } from '@/shared/assets';

import './CharactersPage.scss';

export const CharactersPage = () => {
  return (
    <div className='characters-page container'>
      <div className='characters-page__banner'>
        <img
          className='characters-page__banner-image'
          src={BannerCharactersPage}
          loading='lazy'
          alt='Banner Rick and Morty'
        />
      </div>
      <div className='characters-page__body'>
        <Loader
          size='medium'
          text='Loading character card...'
        />
      </div>
    </div>
  );
};
