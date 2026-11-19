import { useTranslation } from 'react-i18next';
import { Loader } from '@/shared/ui';
import { CharacterCard } from '@/widgets';
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

export const CharactersList = ({
  characters,
  isLoading,
  isError,
  loadMore,
  hasMore,
  isLoadingMore,
  updateCharacter
}: CharactersListProps) => {
  const { t } = useTranslation('characters');
  const { triggerRef } = useInfiniteScroll(loadMore);
  const isEmpty = characters.length === 0;

  if (isLoading) {
    return (
      <Loader
        size='medium'
        text={t('list.loading')}
      />
    );
  }

  if (isError) {
    return (
      <span
        className='characters-list__error'
        role='alert'
      >
        ⚠️ {t('list.error')}
      </span>
    );
  }

  if (isEmpty) {
    return <span className='characters-list__empty'>🤷‍♂️ {t('list.empty')}</span>;
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

      {!hasMore && <p className='characters-list__end'>{t('list.end')}</p>}
    </>
  );
};
