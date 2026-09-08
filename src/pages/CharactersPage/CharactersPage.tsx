import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FilterPanel } from '@/widgets';
import { CharactersList } from '@/widgets';
import { useCharacters } from '@/shared/hooks';
import { BannerCharactersPage } from '@/shared/assets';
import { ErrorBoundary, ErrorFallback } from '@/shared/components';
import './CharactersPage.scss';

export const CharactersPage = () => {
  const [filters, setFilters] = useState({
    name: '',
    gender: '',
    species: '',
    status: null
  });
  const { characters, isLoading, isError } = useCharacters(filters);

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
          updateFilters={(key, value) =>
            setFilters({ ...filters, [key]: value })
          }
        />
        <ErrorBoundary
          fallback={<ErrorFallback message='Failed to load characters list' />}
        >
          <CharactersList
            characters={characters}
            isLoading={isLoading}
            isError={isError}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
};
