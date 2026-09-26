import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { STATUS_OPTIONS } from '@/shared/constants';
import { Select, StatusOption, TextInput } from '@/shared/ui';
import { DoneIcon, EditIcon, ResetIcon } from '@/shared/assets';
import type { Character, CharacterPayload, Status } from '@/entities/character';
import './CharacterCard.scss';

export interface CharacterCardProps extends Character {
  updateCharacter: (id: number, data: Partial<CharacterPayload>) => void;
}

export const CharacterCard = memo(
  ({
    id,
    name: initialName,
    location: initialLocation,
    status: initialStatus,
    gender,
    species,
    image,
    updateCharacter
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
      updateCharacter(id, {
        name: editName,
        location: { name: editLocation },
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
              <Link
                to={`/character/${id}`}
                aria-label={`View details for ${editName}`}
              >
                <span className='character-card__name'>{editName}</span>
              </Link>
            )}
          </div>

          <ol className='character-card__list'>
            <li className='character-card__item'>
              <p className='character-card__title'>Gender</p>
              <span className='character-card__option'>{gender}</span>
            </li>
            <li className='character-card__item'>
              <p className='character-card__title'>Species</p>
              <span className='character-card__option'>{species}</span>
            </li>
            <li className='character-card__item'>
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
            </li>
            <li className='character-card__item'>
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
            </li>
          </ol>
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
              aria-label='Edit character'
            >
              <EditIcon />
            </button>
          )}
        </div>
      </div>
    );
  }
);

CharacterCard.displayName = 'CharacterCard';
