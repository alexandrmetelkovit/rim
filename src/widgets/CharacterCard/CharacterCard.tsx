import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Status } from '@/shared/types';
import { STATUS_OPTIONS } from '@/shared/constants';
import { Select, StatusOption, TextInput } from '@/shared/components';
import { ResetIcon, DoneIcon, EditIcon, RickPhotoCard } from '@/shared/assets';
import './CharacterCard.scss';

export interface CharacterCardProps {
  id: string | number;
  name: string;
  gender: string;
  species: string;
  location: string;
  status: Status;
  onUpdate?: (data: Partial<Omit<CharacterCardProps, 'onUpdate'>>) => void;
}

export const CharacterCard = ({
  id,
  name: initialName,
  gender,
  species,
  location: initialLocation,
  status: initialStatus,
  onUpdate
}: CharacterCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status>(initialStatus);
  const [editName, setEditName] = useState(initialName);
  const [editLocation, setEditLocation] = useState(initialLocation);

  const currentStatus = STATUS_OPTIONS.find(
    (option) => option.value === selectedStatus
  );

  const handleResetIcon = () => {
    setEditName(initialName);
    setEditLocation(initialLocation);
    setSelectedStatus(initialStatus);
    setIsEditing(false);
  };

  const handleDoneIcon = () => {
    onUpdate?.({
      name: editName,
      location: editLocation,
      status: selectedStatus
    });
    setIsEditing(false);
  };

  const handleEditIcon = () => {
    setIsEditing(true);
  };

  return (
    <div className='character-card'>
      <img
        className='character-card__image'
        src={RickPhotoCard}
        alt='photo character'
      />
      <div className='character-card__info'>
        <div className='character-card__header'>
          {isEditing ? (
            <TextInput
              id={`name-${id}`}
              variant='underlined'
              value={editName}
              onChange={(newName) => setEditName(newName)}
            />
          ) : (
            <Link to={'/'}>
              <span className='character-card__name'>{editName}</span>
            </Link>
          )}
        </div>
        <div className='character-card__actions'>
          {isEditing ? (
            <>
              <button
                className='character-card__reset'
                onClick={handleResetIcon}
                aria-label='Reset changes'
              >
                <ResetIcon />
              </button>
              <button
                className='character-card__done'
                onClick={handleDoneIcon}
                aria-label='Save changes'
              >
                <DoneIcon />
              </button>
            </>
          ) : (
            <button
              className='character-card__edit'
              onClick={handleEditIcon}
              aria-label='Editing card'
            >
              <EditIcon />
            </button>
          )}
        </div>

        <div className='character-card__list'>
          <div className='character-card__item'>
            <p className='character-card__title'>Gender</p>
            <p className='character-card__option'>{gender}</p>
          </div>
          <div className='character-card__item'>
            <p className='character-card__title'>Species</p>
            <p className='character-card__option'>{species}</p>
          </div>
          <div className='character-card__item'>
            <p className='character-card__title'>Location</p>
            {isEditing ? (
              <TextInput
                id={`location-${id}`}
                value={editLocation}
                variant='underlined'
                onChange={(newLocation) => setEditLocation(newLocation)}
              />
            ) : (
              <p className='character-card__option'>{editLocation}</p>
            )}
          </div>
          <div className='character-card__item'>
            <p className='character-card__title'>Status</p>
            {isEditing ? (
              <Select
                size='small'
                options={STATUS_OPTIONS}
                value={selectedStatus}
                onChange={setSelectedStatus}
                OptionComponent={({ option }) => {
                  return (
                    <>
                      <span>{option.label}</span>
                      <StatusOption statusColor={option.value} />
                    </>
                  );
                }}
              />
            ) : (
              <div className='character-card__status'>
                <span className='character-card__option'>
                  {currentStatus?.label}
                </span>
                <StatusOption statusColor={selectedStatus} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
