import { useState } from 'react';
import type { Status } from '@/shared/types';
import { BannerCharactersPage } from '@/shared/assets';
import { Select, StatusOption } from '@/shared/components';
import { SPECIES_OPTIONS, STATUS_OPTIONS } from '@/shared/constants';
import './CharactersPage.scss';

export const CharactersPage = () => {
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<Status>('unknown');

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
        <Select
          options={SPECIES_OPTIONS}
          placeholder='Species'
          value={selectedSpecies}
          onChange={setSelectedSpecies}
        />
        <Select
          options={STATUS_OPTIONS}
          value={selectedStatus}
          onChange={setSelectedStatus}
          size='small'
          OptionComponent={({ option }) => {
            return (
              <>
                <span>{option.label}</span>
                <StatusOption statusColor={option.value} />
              </>
            );
          }}
        />
      </div>
    </div>
  );
};
