import { useCallback, useTransition } from 'react';
import { classNames } from '@/shared/lib';
import { useFiltersStore } from '@/stores';
import type { Filters } from '@/shared/types';
import { useCharacters } from '@/shared/hooks';
import { BannerCharactersPage } from '@/assets';
import { CharactersList, FilterPanel } from '@/widgets';
import { ErrorBoundary, ErrorFallback } from '@/shared/ui';
import './CharactersPage.scss';

export const CharactersPage = () => {
  const filters = useFiltersStore((state) => state.filters);
  const setFilter = useFiltersStore((state) => state.setFilter);
  const [isPending, startTransition] = useTransition();
  const {
    characters,
    isLoading,
    isError,
    loadMore,
    hasMore,
    isLoadingMore,
    updateCharacter
  } = useCharacters(filters);

  const handleFilterChange = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      startTransition(() => {
        setFilter(key, value);
      });
    },
    [setFilter]
  );

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
        <FilterPanel
          filters={filters}
          updateFilters={handleFilterChange}
        />
        <ErrorBoundary
          fallback={<ErrorFallback message='Failed to load characters list' />}
        >
          <div
            className={classNames({
              'characters-page__list_pending': isPending
            })}
          >
            <CharactersList
              characters={characters}
              isLoading={isLoading}
              isError={isError}
              loadMore={loadMore}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
              updateCharacter={updateCharacter}
            />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};
