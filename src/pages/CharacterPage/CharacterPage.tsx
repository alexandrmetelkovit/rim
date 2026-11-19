import { useTranslation } from 'react-i18next';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useCharacter } from '@/shared/hooks';
import { ButtonBack, Loader } from '@/shared/ui';
import { STATUS_OPTIONS } from '@/shared/constants';
import './CharacterPage.scss';

export const CharacterPage = () => {
  const { t } = useTranslation(['character', 'common']);
  const { id } = useParams<{ id: string }>();
  const characterId = Number(id);
  const { isLoading, isError, character, isNotFound } =
    useCharacter(characterId);

  if (isLoading) {
    return (
      <div className='character-page__loader'>
        <Loader
          size='medium'
          text={t('loading')}
        />
      </div>
    );
  }

  if (isNotFound) {
    return (
      <Navigate
        to='/404'
        replace
      />
    );
  }

  if (isError) {
    return (
      <p
        className='character-page__error'
        role='alert'
      >
        🤷‍♂️ {t('notFound')}
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
          aria-label={t('back')}
        >
          <ButtonBack text={t('buttonBack.text', { ns: 'common' })} />
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
            {t('information')}
          </h2>
          <ol
            className='character-page__list'
            aria-label='Character information'
          >
            <li className='character-page__item'>
              <span className='character-page__title'>
                {t('fields.gender')}
              </span>
              <span className='character-page__option'>{character.gender}</span>
            </li>
            <li className='character-page__item'>
              <span className='character-page__title'>
                {t('fields.status')}
              </span>
              <span className='character-page__option'>
                {currentStatus?.label}
              </span>
            </li>
            <li className='character-page__item'>
              <span className='character-page__title'>
                {t('fields.species')}
              </span>
              <span className='character-page__option'>
                {character.species}
              </span>
            </li>
            <li className='character-page__item'>
              <span className='character-page__title'>
                {t('fields.origin')}
              </span>
              <span className='character-page__option'>
                {character.origin.name}
              </span>
            </li>
            <li className='character-page__item'>
              <span className='character-page__title'>{t('fields.type')}</span>
              <span className='character-page__option'>
                {character.type || 'Unknown'}
              </span>
            </li>
            <li className='character-page__item'>
              <span className='character-page__title'>
                {t('fields.location')}
              </span>
              <span className='character-page__option'>
                {character.location.name}
              </span>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
};
