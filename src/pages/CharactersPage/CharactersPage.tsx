import { FilterPanel } from '@/widgets';
import { CharacterCard } from '@/widgets';
import { Loader } from '@/shared/components';
import { BannerCharactersPage } from '@/shared/assets';
import { useCharacters } from '@/shared/hooks';
import './CharactersPage.scss';

export const CharactersPage = () => {
  const { characters, isLoading, isError } = useCharacters();

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
        {isLoading && (
          <>
            <Loader
              size='medium'
              text='Loading characters...'
            />
          </>
        )}
        <FilterPanel />
        {isError && (
          <div className='characters-page_error'>List not loaded</div>
        )}
        <ol className='characters-page__list'>
          {characters.map((character) => (
            <li key={character.id}>
              <CharacterCard {...character} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
