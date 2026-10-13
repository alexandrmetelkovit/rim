import { classNames } from '@/shared/lib';
import { BannerCharactersPage } from '@/assets';
import { CharactersList, FilterPanel } from '@/widgets';
import { ErrorBoundary, ErrorFallback } from '@/shared/ui';
import { useCharactersWithFilters } from '@/shared/hooks/useCharactersWithFilters';
import './CharactersPage.scss';

export const CharactersPage = () => {
  const {
    characters,
    isLoading,
    isError,
    loadMore,
    hasMore,
    isLoadingMore,
    updateCharacter,
    filters,
    handleFilterChange,
    isPending
  } = useCharactersWithFilters();

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
