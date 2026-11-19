import { useTranslation } from 'react-i18next';
import './Footer.scss';

export const Footer = () => {
  const { t } = useTranslation('footer');

  return <footer className='footer'>{t('text')}</footer>;
};
