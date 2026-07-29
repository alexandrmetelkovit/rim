import { Link } from 'react-router-dom';
import { ButtonBack, Loader } from '@/shared/components';
import './CharacterPage.scss';

export const CharacterPage = () => {
  return (
    <div className='character-page container'>
      <div className='character-page__actions'>
        <Link to='/'>
          <ButtonBack />
        </Link>
      </div>
      <div className='character-page__body'>
        <Loader
          size='medium'
          text='Loading character card...'
        />
        <Loader size='small' />
      </div>
    </div>
  );
};
