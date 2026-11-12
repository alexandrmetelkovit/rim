import { useTranslation } from 'react-i18next';
import './Footer.scss';

export const Footer = () => {
  const { t } = useTranslation();

  return <footer className='footer'>{t('footer.text')}</footer>;
};
