import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enHeader from './locales/en/header.json';
import enFooter from './locales/en/footer.json';
import enCharacters from './locales/en/characters.json';
import enCharacter from './locales/en/character.json';

import ruCommon from './locales/ru/common.json';
import ruHeader from './locales/ru/header.json';
import ruFooter from './locales/ru/footer.json';
import ruCharacters from './locales/ru/characters.json';
import ruCharacter from './locales/ru/character.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        header: enHeader,
        footer: enFooter,
        characters: enCharacters,
        character: enCharacter
      },
      ru: {
        common: ruCommon,
        header: ruHeader,
        footer: ruFooter,
        characters: ruCharacters,
        character: ruCharacter
      }
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    defaultNS: 'common',
    ns: ['common', 'header', 'footer', 'characters', 'character'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
