import { memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCharacter } from '@/shared/hooks';
import { STATUS_OPTIONS } from '@/shared/constants';
import { ButtonBack, Loader } from '@/shared/components';
import './CharacterPage.scss';

export const CharacterPage = memo(() => {
  const { id } = useParams<{ id: string }>();
  const characterId = Number(id);
  const { isLoading, isError, character } = useCharacter(characterId);

  if (isLoading) {
    return (
      <div className='character-page__loader'>
        <Loader
          size='medium'
          text='Loading character card...'
        />
      </div>
    );
  }

  if (isError) {
    return (
      <p
        className='character-page__error'
        role='alert'
      >
        🤷‍♂️ Character not found...
      </p>
    );
  }

  if (!character) {
    return null;
  }

  const currentStatus = STATUS_OPTIONS.find(
    (option) => option.value === character.status
  );

  return (
    <div className='character-page container'>
      <div className='character-page__actions'>
        <Link
          to='/'
          aria-label='Back to characters list'
        >
          <ButtonBack />
        </Link>
      </div>
      <div className='character-page__body'>
        <figure className='character-page__header'>
          <img
            className='character-page__image'
            src={character.image}
            alt={character.name}
          />
          <figcaption>
            <h1 className='character-page__name'>{character.name}</h1>
          </figcaption>
        </figure>
        <section
          className='character-page__info'
          aria-labelledby='info-title'
        >
          <h2
            id='info-title'
            className='character-page__list-title'
          >
            Information
          </h2>
          <ol
            className='character-page__list'
            aria-label='Character information'
          >
            <li className='character-page__item'>
              <span className='character-page__title'>Gender</span>
              <span className='character-page__option'>{character.gender}</span>
            </li>
            <li className='character-page__item'>
              <span className='character-page__title'>Status</span>
              <span className='character-page__option'>
                {currentStatus?.label}
              </span>
            </li>
            <li className='character-page__item'>
              <span className='character-page__title'>Species</span>
              <span className='character-page__option'>
                {character.species}
              </span>
            </li>
            <li className='character-page__item'>
              <span className='character-page__title'>Origin</span>
              <span className='character-page__option'>
                {character.origin.name}
              </span>
            </li>
            <li className='character-page__item'>
              <span className='character-page__title'>Type</span>
              <span className='character-page__option'>
                {character.type || 'Unknown'}
              </span>
            </li>
            <li className='character-page__item'>
              <span className='character-page__title'>Location</span>
              <span className='character-page__option'>
                {character.location.name}
              </span>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
});

CharacterPage.displayName = 'CharacterPage';
