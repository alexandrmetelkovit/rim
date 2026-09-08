import { CharacterCard } from '@/widgets';
import { Loader } from '@/shared/components';
import type { Character } from '@/shared/types';
import './CharactersList.scss';

interface CharactersListProps {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
}

export const CharactersList = ({
  characters,
  isLoading,
  isError
}: CharactersListProps) => {
  const isEmpty = characters.length === 0;

  if (isLoading && isEmpty) {
    return (
      <Loader
        size='medium'
        text='Loading characters...'
      />
    );
  }

  if (isError) {
    return (
      <span className='characters-list_error'>
        ⚠️ Server error. Please try again later.
      </span>
    );
  }

  if (isEmpty) {
    return (
      <span className='characters-list_empty'>
        🤷‍♂️ No characters found. Try another filter.
      </span>
    );
  }

  return (
    <ol className='characters-list'>
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard {...character} />
        </li>
      ))}
    </ol>
  );
};
