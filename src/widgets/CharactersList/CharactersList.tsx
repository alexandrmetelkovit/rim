import { memo } from 'react';
import { CharacterCard } from '@/widgets';
import { Loader } from '@/shared/components';
import { useInfiniteScroll } from '@/shared/hooks';
import type { Character, CharacterPayload } from '@/shared/types';
import './CharactersList.scss';

interface CharactersListProps {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
  loadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
  updateCharacter: (id: number, data: Partial<CharacterPayload>) => void;
}

export const CharactersList = memo(
  ({
    characters,
    isLoading,
    isError,
    loadMore,
    hasMore,
    isLoadingMore,
    updateCharacter
  }: CharactersListProps) => {
    const { triggerRef } = useInfiniteScroll(loadMore);
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
        <span className='characters-list__error'>
          ⚠️ Server error. Please try again later.
        </span>
      );
    }

    if (isEmpty) {
      return (
        <span className='characters-list__empty'>
          🤷‍♂️ No characters found. Try another filter.
        </span>
      );
    }

    return (
      <>
        <ol className='characters-list'>
          {characters.map((character) => (
            <li key={character.id}>
              <CharacterCard
                {...character}
                updateCharacter={updateCharacter}
              />
            </li>
          ))}
        </ol>

        <div
          ref={triggerRef}
          className='characters-list__trigger'
        >
          {isLoadingMore && <Loader size='small' />}
        </div>

        {!hasMore && (
          <p className='characters-list__end'>No more characters...</p>
        )}
      </>
    );
  }
);

CharactersList.displayName = 'CharactersList';
