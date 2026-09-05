import { useState } from 'react';
import { Link } from 'react-router-dom';
import { STATUS_OPTIONS } from '@/shared/constants';
import { DoneIcon, EditIcon, ResetIcon } from '@/shared/assets';
import { Select, StatusOption, TextInput } from '@/shared/components';
import type { Character, CharacterPayload, Status } from '@/shared/types';
import './CharacterCard.scss';

export interface CharacterCardProps extends Character {
  onUpdate?: (data: CharacterPayload) => void;
}

export const CharacterCard = ({
  id,
  name: initialName,
  location: initialLocation,
  status: initialStatus,
  gender,
  species,
  image,
  onUpdate
}: CharacterCardProps) => {
  const [editName, setEditName] = useState(initialName);
  const [editLocation, setEditLocation] = useState(initialLocation.name);
  const [selectedStatus, setSelectedStatus] = useState<Status>(initialStatus);
  const [isEditing, setIsEditing] = useState(false);

  const currentStatus = STATUS_OPTIONS.find(
    (option) => option.value === selectedStatus
  );

  const handleResetClick = () => {
    setEditName(initialName);
    setEditLocation(initialLocation.name);
    setSelectedStatus(initialStatus);
    setIsEditing(false);
  };

  const handleDoneClick = () => {
    onUpdate?.({
      name: editName,
      location: editLocation,
      status: selectedStatus
    });
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className='character-card'>
      <img
        className='character-card__image'
        src={image}
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

        <div className='character-card__list'>
          <div className='character-card__item'>
            <p className='character-card__title'>Gender</p>
            <span className='character-card__option'>{gender}</span>
          </div>
          <div className='character-card__item'>
            <p className='character-card__title'>Species</p>
            <span className='character-card__option'>{species}</span>
          </div>
          <div className='character-card__item'>
            <p className='character-card__title'>Location</p>
            {isEditing ? (
              <TextInput
                id={`location-${id}`}
                value={editLocation}
                variant='underlined'
                size='small'
                onChange={(newLocation) => setEditLocation(newLocation)}
              />
            ) : (
              <span className='character-card__option'>{editLocation}</span>
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
      <div className='character-card__actions'>
        {isEditing ? (
          <>
            <button
              className='character-card__reset'
              onClick={handleResetClick}
              aria-label='Reset changes'
            >
              <ResetIcon />
            </button>
            <button
              className='character-card__done'
              onClick={handleDoneClick}
              aria-label='Save changes'
            >
              <DoneIcon />
            </button>
          </>
        ) : (
          <button
            className='character-card__edit'
            onClick={handleEditClick}
            aria-label='Editing card'
          >
            <EditIcon />
          </button>
        )}
      </div>
    </div>
  );
};
