import { FilterPanel } from '@/widgets';
import { useFilters } from '@/features';
import { CharactersList } from '@/widgets';
import { useCharacters } from '@/shared/hooks';
import { BannerCharactersPage } from '@/shared/assets';
import { ErrorBoundary, ErrorFallback } from '@/shared/ui';
import './CharactersPage.scss';

export const CharactersPage = () => {
  const { filters, updateFilters } = useFilters();
  const {
    characters,
    isLoading,
    isError,
    loadMore,
    hasMore,
    isLoadingMore,
    updateCharacter
  } = useCharacters(filters);

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
};
