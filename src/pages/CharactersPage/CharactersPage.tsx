import { memo, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FilterPanel } from '@/widgets';
import { CharactersList } from '@/widgets';
import { useCharacters } from '@/shared/hooks';
import type { Filters } from '@/shared/types';
import { BannerCharactersPage } from '@/shared/assets';
import { ErrorBoundary, ErrorFallback } from '@/shared/components';
import './CharactersPage.scss';

export const CharactersPage = memo(() => {
  const [filters, setFilters] = useState({
    name: '',
    gender: '',
    species: '',
    status: null
  });

  const {
    characters,
    isLoading,
    isError,
    loadMore,
    hasMore,
    isLoadingMore,
    updateCharacter
  } = useCharacters(filters);

  const updateFilters = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load characters, Please try again.');
    }
  }, [isError]);

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
          updateFilters={updateFilters}
        />
        <ErrorBoundary
          fallback={<ErrorFallback message='Failed to load characters list' />}
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
        </ErrorBoundary>
      </div>
    </div>
  );
});

CharactersPage.displayName = 'CharactersPage';
