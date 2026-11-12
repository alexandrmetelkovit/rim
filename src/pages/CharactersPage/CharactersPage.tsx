import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib';
import { BannerCharactersPage } from '@/assets';
import { CharactersList, FilterPanel } from '@/widgets';
import { useCharactersWithFilters } from '@/shared/hooks';
import { ErrorBoundary, ErrorFallback } from '@/shared/ui';
import './CharactersPage.scss';

export const CharactersPage = () => {
  const { t } = useTranslation();
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
          alt={t('charactersPage.bannerImage')}
        />
      </div>
      <div className='characters-page__body'>
        <FilterPanel
          filters={filters}
          updateFilters={handleFilterChange}
        />
        <ErrorBoundary
          fallback={
            <ErrorFallback messageKey='errorBoundaryFallback.charactersList' />
          }
        >
          <section
            className={classNames('characters-page__list', {
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
          </section>
        </ErrorBoundary>
      </div>
    </div>
  );
};
