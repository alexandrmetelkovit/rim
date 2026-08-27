import { BannerCharactersPage } from '@/shared/assets';
import { CharacterCard, type CharacterCardProps } from '@/widgets';
import './CharactersPage.scss';
import { FilterPanel } from '@/widgets/FilterPanel/FilterPanel';

const mockCharacters: CharacterCardProps[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    gender: 'Male',
    species: 'Human',
    location: 'Earth',
    status: 'alive'
  },
  {
    id: '2',
    name: 'pitkin Sanchez',
    gender: 'Male',
    species: 'Human',
    location: 'Earth',
    status: 'dead'
  },
  {
    id: '3',
    name: 'pitkin Sanchez',
    gender: 'Male',
    species: 'Human',
    location: 'Earth',
    status: 'dead'
  },
  {
    id: '4',
    name: 'pitkin Sanchez',
    gender: 'Male',
    species: 'Human',
    location: 'Earth',
    status: 'dead'
  }
];

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
        <FilterPanel />

        {mockCharacters.map((character) => {
          return (
            <CharacterCard
              key={character.id}
              {...character}
            />
          );
        })}
      </div>
    </div>
  );
};
