import { CharacterCard } from '@/widgets';
import { Loader } from '@/shared/components';
import type { Character } from '@/shared/types';
import './CharactersList.scss';
import { useInfiniteScroll } from '@/shared/hooks';

interface CharactersListProps {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
  loadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
}

export const CharactersList = ({
  characters,
  isLoading,
  isError,
  loadMore,
  hasMore,
  isLoadingMore
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
            <CharacterCard {...character} />
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
};
