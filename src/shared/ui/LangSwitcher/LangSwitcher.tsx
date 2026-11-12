import { useTranslation } from 'react-i18next';
import { Button } from '../buttons/Button/Button';

export const LangSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      text={i18n.language === 'en' ? 'РУ' : 'EN'}
      onClick={toggleLang}
    />
  );
};
