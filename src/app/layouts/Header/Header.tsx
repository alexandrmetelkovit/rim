import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/stores';
import { Button, LangSwitcher } from '@/shared/ui';
import { useCharactersWithFilters } from '@/shared/hooks';
import { LogoLightTheme, MoonIcon, SunIcon } from '@/assets';
import './Header.scss';

export const Header = () => {
  const { t } = useTranslation();
  const { resetFilters } = useCharactersWithFilters();
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const isDark = theme === 'dark';

  return (
    <header className='header'>
      <div className='header__info container'>
        <div className='header__logo'>
          <Link
            to='/'
            onClick={resetFilters}
          >
            <LogoLightTheme className='header__logo-image' />
          </Link>
        </div>
        <div className='header__actions'>
          <Button
            icon={isDark ? <MoonIcon /> : <SunIcon />}
            onClick={toggleTheme}
            aria-label={isDark ? t('header.themeLight') : t('header.themeDark')}
          />
          <LangSwitcher />
        </div>
      </div>
    </header>
  );
};
