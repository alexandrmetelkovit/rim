import { useState } from 'react';
import { SearchIcon } from '@/shared/assets';
import type { Status } from '@/shared/types';
import { Select, TextInput } from '@/shared/components';
import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/shared/constants';

import './FilterPanel.scss';

export const FilterPanel = () => {
  const [nameInput, setNameInput] = useState('');
  const [speciesSelect, setSpeciesSelect] = useState('');
  const [genderSelect, setGenderSelect] = useState('');
  const [statusSelect, setStatusSelect] = useState<Status | null>(null);

  return (
    <div className='filter-panel'>
      <TextInput
        id='filter-name'
        variant='bordered'
        placeholder='Filter by name...'
        SearchIcon={SearchIcon}
        value={nameInput}
        onChange={setNameInput}
      />
      <Select
        options={SPECIES_OPTIONS}
        placeholder='Species'
        value={speciesSelect}
        onChange={setSpeciesSelect}
      />
      <Select
        options={GENDER_OPTIONS}
        placeholder='Gender'
        value={genderSelect}
        onChange={setGenderSelect}
      />
      <Select
        options={STATUS_OPTIONS}
        placeholder='Status'
        value={statusSelect}
        onChange={setStatusSelect}
      />
    </div>
  );
};
