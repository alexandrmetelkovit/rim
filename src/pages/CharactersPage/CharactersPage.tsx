import { useTransition } from 'react';
import { FilterPanel } from '@/widgets';
import { CharactersList } from '@/widgets';
import { BannerCharactersPage } from '@/shared/assets';
import { useCharacters, useFilters } from '@/shared/hooks';
import { ErrorBoundary, ErrorFallback } from '@/shared/ui';
import './CharactersPage.scss';
import type { Filters } from '@/shared/types';
import { classNames } from '@/shared/lib';

export const CharactersPage = () => {
  const { filters, updateFilters } = useFilters();
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

  const handleFilterChange = <K extends keyof Filters>(
    key: K,
    value: Filters[K]
  ) => {
    startTransition(() => {
      updateFilters(key, value);
    });
  };

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
          // updateFilters={updateFilters}
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
