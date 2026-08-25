import { BannerCharactersPage } from '@/shared/assets';
import {
  CharacterCard,
  type CharacterCardProps
} from '@/widgets/CharacterCard/CharacterCard';
import './CharactersPage.scss';

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
        {mockCharacters.map((character) => {
          return <CharacterCard {...character} />;
        })}
      </div>
    </div>
  );
};
